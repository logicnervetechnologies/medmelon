import { assertOk } from '@medplum/core';
import { Binary } from '@medplum/fhirtypes';
import { Request, Response, Router } from 'express';
import { asyncWrap } from './async';
import { systemRepo } from './fhir/repo';
import { getBinaryStorage } from './fhir/storage';

export const storageRouter = Router();

// This endpoint emulates CloudFront storage for localhost development.
// It is not intended for production use.
storageRouter.get(
  '/:id/:versionId?',
  asyncWrap(async (req: Request, res: Response) => {
    if (!req.query['Signature']) {
      res.sendStatus(401);
      return;
    }

    const { id } = req.params;
    const [outcome, resource] = await systemRepo.readResource('Binary', id);
    assertOk(outcome);

    const binary = resource as Binary;
    res.status(200).contentType(binary.contentType as string);
    await getBinaryStorage().readBinary(binary, res);
  })
);