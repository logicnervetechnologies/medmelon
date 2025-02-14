import { createReference } from '@medplum/core';
import { Bundle, ClientApplication, Login, Project, ProjectMembership, Resource } from '@medplum/fhirtypes';
import { randomUUID } from 'crypto';
import { systemRepo } from './fhir/repo';
import { generateAccessToken } from './oauth/keys';

export async function createTestProject(options?: Partial<Project>): Promise<{
  project: Project;
  client: ClientApplication;
  membership: ProjectMembership;
}> {
  const project = await systemRepo.createResource<Project>({
    resourceType: 'Project',
    name: 'Test Project',
    owner: {
      reference: 'User/' + randomUUID(),
    },
    strictMode: true,
    features: ['bots', 'email', 'graphql-introspection'],
    secret: [
      {
        name: 'foo',
        valueString: 'bar',
      },
    ],
    ...options,
  });

  const client = await systemRepo.createResource<ClientApplication>({
    resourceType: 'ClientApplication',
    secret: randomUUID(),
    redirectUri: 'https://example.com/',
    meta: {
      project: project.id as string,
    },
  });

  const membership = await systemRepo.createResource<ProjectMembership>({
    resourceType: 'ProjectMembership',
    user: createReference(client),
    profile: createReference(client),
    project: createReference(project),
  });

  return {
    project,
    client,
    membership,
  };
}

export async function createTestClient(options?: Partial<Project>): Promise<ClientApplication> {
  return (await createTestProject(options)).client;
}

export async function initTestAuth(options?: Partial<Project>): Promise<string> {
  const { client, membership } = await createTestProject(options);
  const scope = 'openid';

  const login = await systemRepo.createResource<Login>({
    resourceType: 'Login',
    authMethod: 'client',
    user: createReference(client),
    client: createReference(client),
    membership: createReference(membership),
    authTime: new Date().toISOString(),
    scope,
  });

  return generateAccessToken({
    login_id: login.id as string,
    sub: client.id as string,
    username: client.id as string,
    client_id: client.id as string,
    profile: client.resourceType + '/' + client.id,
    scope,
  });
}

/**
 * Sets up the pwnedPassword mock to handle "Have I Been Pwned" requests.
 * @param pwnedPassword The pwnedPassword mock.
 * @param numPwns The mock value to return. Zero is a safe password.
 */
export function setupPwnedPasswordMock(pwnedPassword: jest.Mock, numPwns: number): void {
  pwnedPassword.mockImplementation(async () => numPwns);
}

/**
 * Sets up the fetch mock to handle Recaptcha requests.
 * @param fetch The fetch mock.
 * @param success Whether the mock should return a successful response.
 */
export function setupRecaptchaMock(fetch: jest.Mock, success: boolean): void {
  fetch.mockImplementation(() => ({
    status: 200,
    json: () => ({ success }),
  }));
}

/**
 * Returns true if the resource is in an entry in the bundle.
 * @param bundle A bundle of resources.
 * @param resource The resource to search for.
 * @returns True if the resource is in the bundle.
 */
export function bundleContains(bundle: Bundle, resource: Resource): boolean {
  return !!bundle.entry?.some((entry) => entry.resource?.id === resource.id);
}
