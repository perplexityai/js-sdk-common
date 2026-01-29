import ApiEndpoints from './api-endpoints';
import { logger as applicationLogger, loggerPrefix } from './application-logger';
import type { IAssignmentHooks } from './assignment-hooks';
import type { IAssignmentLogger, IAssignmentEvent } from './assignment-logger';
import type { IBanditLogger, IBanditEvent } from './bandit-logger';
import {
  AbstractAssignmentCache,
  assignmentCacheKeyToString,
  assignmentCacheValueToString,
} from './cache/abstract-assignment-cache';
import type {
  AssignmentCache,
  AsyncMap,
  AssignmentCacheKey,
  AssignmentCacheValue,
  AssignmentCacheEntry,
} from './cache/abstract-assignment-cache';
import { LRUInMemoryAssignmentCache } from './cache/lru-in-memory-assignment-cache';
import { NonExpiringInMemoryAssignmentCache } from './cache/non-expiring-in-memory-cache-assignment';
import EppoClient from './client/eppo-client';
import type {
  EppoClientParameters,
  FlagConfigurationRequestParameters,
  IAssignmentDetails,
  IContainerExperiment,
} from './client/eppo-client';
import EppoPrecomputedClient from './client/eppo-precomputed-client';
import type {
  PrecomputedFlagsRequestParameters,
  Subject,
} from './client/eppo-precomputed-client';
import FlagConfigRequestor from './configuration-requestor';
import type {
  IConfigurationStore,
  IAsyncStore,
  ISyncStore,
} from './configuration-store/configuration-store';
import { HybridConfigurationStore } from './configuration-store/hybrid.store';
import { MemoryStore, MemoryOnlyConfigurationStore } from './configuration-store/memory.store';
import { ConfigurationWireHelper } from './configuration-wire/configuration-wire-helper';
import type {
  IConfigurationWire,
  IObfuscatedPrecomputedConfigurationResponse,
  IPrecomputedConfigurationResponse,
} from './configuration-wire/configuration-wire-types';
import * as constants from './constants';
import { decodePrecomputedFlag } from './decoding';
import { EppoAssignmentLogger } from './eppo-assignment-logger';
import BatchEventProcessor from './events/batch-event-processor';
import { BoundedEventQueue } from './events/bounded-event-queue';
import DefaultEventDispatcher, {
  DEFAULT_EVENT_DISPATCHER_CONFIG,
  DEFAULT_EVENT_DISPATCHER_BATCH_SIZE,
  newDefaultEventDispatcher,
} from './events/default-event-dispatcher';
import type Event from './events/event';
import type EventDispatcher from './events/event-dispatcher';
import type NamedEventQueue from './events/named-event-queue';
import type NetworkStatusListener from './events/network-status-listener';
import HttpClient from './http-client';
import { VariationType, FormatEnum } from './interfaces';
import type {
  PrecomputedFlag,
  Flag,
  ObfuscatedFlag,
  BanditParameters,
  BanditVariation,
  IObfuscatedPrecomputedBandit,
  Variation,
  Environment,
} from './interfaces';
import { buildStorageKeySuffix } from './obfuscation';
import type {
  AttributeType,
  Attributes,
  BanditActions,
  BanditSubjectAttributes,
  ContextAttributes,
  FlagKey,
} from './types';
import * as validation from './validation';

// Value exports
export {
  loggerPrefix,
  applicationLogger,
  AbstractAssignmentCache,
  EppoAssignmentLogger,
  EppoClient,
  constants,
  ApiEndpoints,
  FlagConfigRequestor,
  HttpClient,
  validation,

  // Precomputed Client
  EppoPrecomputedClient,

  // Configuration store
  MemoryStore,
  HybridConfigurationStore,
  MemoryOnlyConfigurationStore,

  // Assignment cache
  NonExpiringInMemoryAssignmentCache,
  LRUInMemoryAssignmentCache,
  assignmentCacheKeyToString,
  assignmentCacheValueToString,

  // Enums
  VariationType,
  FormatEnum,

  // event dispatcher
  BoundedEventQueue,
  DEFAULT_EVENT_DISPATCHER_CONFIG,
  DEFAULT_EVENT_DISPATCHER_BATCH_SIZE,
  newDefaultEventDispatcher,
  BatchEventProcessor,
  DefaultEventDispatcher,

  // Configuration interchange.
  ConfigurationWireHelper,

  // Test helpers
  decodePrecomputedFlag,

  // Utilities
  buildStorageKeySuffix,
};

// Type exports
export type {
  IAssignmentDetails,
  IAssignmentHooks,
  IAssignmentLogger,
  IAssignmentEvent,
  IBanditLogger,
  IBanditEvent,
  IContainerExperiment,
  EppoClientParameters,
  PrecomputedFlagsRequestParameters,
  IObfuscatedPrecomputedConfigurationResponse,
  IObfuscatedPrecomputedBandit,

  // Configuration store types
  IConfigurationStore,
  IAsyncStore,
  ISyncStore,

  // Assignment cache types
  AssignmentCacheKey,
  AssignmentCacheValue,
  AssignmentCacheEntry,
  AssignmentCache,
  AsyncMap,

  // Interface types
  FlagConfigurationRequestParameters,
  Flag,
  ObfuscatedFlag,
  Variation,
  AttributeType,
  Attributes,
  ContextAttributes,
  BanditSubjectAttributes,
  BanditActions,
  BanditVariation,
  BanditParameters,
  Subject,
  Environment,

  // event dispatcher types
  NamedEventQueue,
  EventDispatcher,
  NetworkStatusListener,
  Event,

  // Configuration interchange types
  IConfigurationWire,
  IPrecomputedConfigurationResponse,
  PrecomputedFlag,
  FlagKey,
};
