/*
 * Generated by @medplum/generator
 * Do not edit manually.
 */

import { Annotation } from './Annotation';
import { CodeableConcept } from './CodeableConcept';
import { Condition } from './Condition';
import { Device } from './Device';
import { DiagnosticReport } from './DiagnosticReport';
import { DocumentReference } from './DocumentReference';
import { Encounter } from './Encounter';
import { Extension } from './Extension';
import { Group } from './Group';
import { Identifier } from './Identifier';
import { Meta } from './Meta';
import { Narrative } from './Narrative';
import { Observation } from './Observation';
import { Patient } from './Patient';
import { Period } from './Period';
import { Practitioner } from './Practitioner';
import { PractitionerRole } from './PractitionerRole';
import { Range } from './Range';
import { Reference } from './Reference';
import { Resource } from './Resource';

/**
 * An assessment of the likely outcome(s) for a patient or other subject
 * as well as the likelihood of each outcome.
 */
export interface RiskAssessment {

  /**
   * This is a RiskAssessment resource
   */
  readonly resourceType: 'RiskAssessment';

  /**
   * The logical id of the resource, as used in the URL for the resource.
   * Once assigned, this value never changes.
   */
  readonly id?: string;

  /**
   * The metadata about the resource. This is content that is maintained by
   * the infrastructure. Changes to the content might not always be
   * associated with version changes to the resource.
   */
  readonly meta?: Meta;

  /**
   * A reference to a set of rules that were followed when the resource was
   * constructed, and which must be understood when processing the content.
   * Often, this is a reference to an implementation guide that defines the
   * special rules along with other profiles etc.
   */
  readonly implicitRules?: string;

  /**
   * The base language in which the resource is written.
   */
  readonly language?: string;

  /**
   * A human-readable narrative that contains a summary of the resource and
   * can be used to represent the content of the resource to a human. The
   * narrative need not encode all the structured data, but is required to
   * contain sufficient detail to make it &quot;clinically safe&quot; for a human to
   * just read the narrative. Resource definitions may define what content
   * should be represented in the narrative to ensure clinical safety.
   */
  readonly text?: Narrative;

  /**
   * These resources do not have an independent existence apart from the
   * resource that contains them - they cannot be identified independently,
   * and nor can they have their own independent transaction scope.
   */
  readonly contained?: Resource[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the resource. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  readonly extension?: Extension[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the resource and that modifies the
   * understanding of the element that contains it and/or the understanding
   * of the containing element's descendants. Usually modifier elements
   * provide negation or qualification. To make the use of extensions safe
   * and manageable, there is a strict set of governance applied to the
   * definition and use of extensions. Though any implementer is allowed to
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension. Applications processing a
   * resource are required to check for modifier extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on
   * Resource or DomainResource (including cannot change the meaning of
   * modifierExtension itself).
   */
  readonly modifierExtension?: Extension[];

  /**
   * Business identifier assigned to the risk assessment.
   */
  readonly identifier?: Identifier[];

  /**
   * A reference to the request that is fulfilled by this risk assessment.
   */
  readonly basedOn?: Reference<Resource>;

  /**
   * A reference to a resource that this risk assessment is part of, such
   * as a Procedure.
   */
  readonly parent?: Reference<Resource>;

  /**
   * The status of the RiskAssessment, using the same statuses as an
   * Observation.
   */
  readonly status?: string;

  /**
   * The algorithm, process or mechanism used to evaluate the risk.
   */
  readonly method?: CodeableConcept;

  /**
   * The type of the risk assessment performed.
   */
  readonly code?: CodeableConcept;

  /**
   * The patient or group the risk assessment applies to.
   */
  readonly subject?: Reference<Patient | Group>;

  /**
   * The encounter where the assessment was performed.
   */
  readonly encounter?: Reference<Encounter>;

  /**
   * The date (and possibly time) the risk assessment was performed.
   */
  readonly occurrenceDateTime?: string;

  /**
   * The date (and possibly time) the risk assessment was performed.
   */
  readonly occurrencePeriod?: Period;

  /**
   * For assessments or prognosis specific to a particular condition,
   * indicates the condition being assessed.
   */
  readonly condition?: Reference<Condition>;

  /**
   * The provider or software application that performed the assessment.
   */
  readonly performer?: Reference<Practitioner | PractitionerRole | Device>;

  /**
   * The reason the risk assessment was performed.
   */
  readonly reasonCode?: CodeableConcept[];

  /**
   * Resources supporting the reason the risk assessment was performed.
   */
  readonly reasonReference?: Reference<Condition | Observation | DiagnosticReport | DocumentReference>[];

  /**
   * Indicates the source data considered as part of the assessment (for
   * example, FamilyHistory, Observations, Procedures, Conditions, etc.).
   */
  readonly basis?: Reference<Resource>[];

  /**
   * Describes the expected outcome for the subject.
   */
  readonly prediction?: RiskAssessmentPrediction[];

  /**
   * A description of the steps that might be taken to reduce the
   * identified risk(s).
   */
  readonly mitigation?: string;

  /**
   * Additional comments about the risk assessment.
   */
  readonly note?: Annotation[];
}

/**
 * Describes the expected outcome for the subject.
 */
export interface RiskAssessmentPrediction {

  /**
   * Unique id for the element within a resource (for internal references).
   * This may be any string value that does not contain spaces.
   */
  readonly id?: string;

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  readonly extension?: Extension[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element and that modifies the
   * understanding of the element in which it is contained and/or the
   * understanding of the containing element's descendants. Usually
   * modifier elements provide negation or qualification. To make the use
   * of extensions safe and manageable, there is a strict set of governance
   * applied to the definition and use of extensions. Though any
   * implementer can define an extension, there is a set of requirements
   * that SHALL be met as part of the definition of the extension.
   * Applications processing a resource are required to check for modifier
   * extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on
   * Resource or DomainResource (including cannot change the meaning of
   * modifierExtension itself).
   */
  readonly modifierExtension?: Extension[];

  /**
   * One of the potential outcomes for the patient (e.g. remission, death,
   * a particular condition).
   */
  readonly outcome?: CodeableConcept;

  /**
   * Indicates how likely the outcome is (in the specified timeframe).
   */
  readonly probabilityDecimal?: number;

  /**
   * Indicates how likely the outcome is (in the specified timeframe).
   */
  readonly probabilityRange?: Range;

  /**
   * Indicates how likely the outcome is (in the specified timeframe),
   * expressed as a qualitative value (e.g. low, medium, or high).
   */
  readonly qualitativeRisk?: CodeableConcept;

  /**
   * Indicates the risk for this particular subject (with their specific
   * characteristics) divided by the risk of the population in general.
   * (Numbers greater than 1 = higher risk than the population, numbers
   * less than 1 = lower risk.).
   */
  readonly relativeRisk?: number;

  /**
   * Indicates the period of time or age range of the subject to which the
   * specified probability applies.
   */
  readonly whenPeriod?: Period;

  /**
   * Indicates the period of time or age range of the subject to which the
   * specified probability applies.
   */
  readonly whenRange?: Range;

  /**
   * Additional information explaining the basis for the prediction.
   */
  readonly rationale?: string;
}