
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model user_info
 * 
 */
export type user_info = $Result.DefaultSelection<Prisma.$user_infoPayload>
/**
 * Model customer_info
 * 
 */
export type customer_info = $Result.DefaultSelection<Prisma.$customer_infoPayload>
/**
 * Model institutions
 * 
 */
export type institutions = $Result.DefaultSelection<Prisma.$institutionsPayload>
/**
 * Model institution_region_year
 * 
 */
export type institution_region_year = $Result.DefaultSelection<Prisma.$institution_region_yearPayload>
/**
 * Model institution_type_year
 * 
 */
export type institution_type_year = $Result.DefaultSelection<Prisma.$institution_type_yearPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more User_infos
 * const user_infos = await prisma.user_info.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more User_infos
   * const user_infos = await prisma.user_info.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user_info`: Exposes CRUD operations for the **user_info** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_infos
    * const user_infos = await prisma.user_info.findMany()
    * ```
    */
  get user_info(): Prisma.user_infoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer_info`: Exposes CRUD operations for the **customer_info** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customer_infos
    * const customer_infos = await prisma.customer_info.findMany()
    * ```
    */
  get customer_info(): Prisma.customer_infoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.institutions`: Exposes CRUD operations for the **institutions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Institutions
    * const institutions = await prisma.institutions.findMany()
    * ```
    */
  get institutions(): Prisma.institutionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.institution_region_year`: Exposes CRUD operations for the **institution_region_year** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Institution_region_years
    * const institution_region_years = await prisma.institution_region_year.findMany()
    * ```
    */
  get institution_region_year(): Prisma.institution_region_yearDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.institution_type_year`: Exposes CRUD operations for the **institution_type_year** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Institution_type_years
    * const institution_type_years = await prisma.institution_type_year.findMany()
    * ```
    */
  get institution_type_year(): Prisma.institution_type_yearDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    user_info: 'user_info',
    customer_info: 'customer_info',
    institutions: 'institutions',
    institution_region_year: 'institution_region_year',
    institution_type_year: 'institution_type_year'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user_info" | "customer_info" | "institutions" | "institution_region_year" | "institution_type_year"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      user_info: {
        payload: Prisma.$user_infoPayload<ExtArgs>
        fields: Prisma.user_infoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_infoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_infoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          findFirst: {
            args: Prisma.user_infoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_infoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          findMany: {
            args: Prisma.user_infoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>[]
          }
          create: {
            args: Prisma.user_infoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          createMany: {
            args: Prisma.user_infoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_infoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>[]
          }
          delete: {
            args: Prisma.user_infoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          update: {
            args: Prisma.user_infoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          deleteMany: {
            args: Prisma.user_infoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_infoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_infoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>[]
          }
          upsert: {
            args: Prisma.user_infoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          aggregate: {
            args: Prisma.User_infoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_info>
          }
          groupBy: {
            args: Prisma.user_infoGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_infoGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_infoCountArgs<ExtArgs>
            result: $Utils.Optional<User_infoCountAggregateOutputType> | number
          }
        }
      }
      customer_info: {
        payload: Prisma.$customer_infoPayload<ExtArgs>
        fields: Prisma.customer_infoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.customer_infoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.customer_infoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload>
          }
          findFirst: {
            args: Prisma.customer_infoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.customer_infoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload>
          }
          findMany: {
            args: Prisma.customer_infoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload>[]
          }
          create: {
            args: Prisma.customer_infoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload>
          }
          createMany: {
            args: Prisma.customer_infoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.customer_infoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload>[]
          }
          delete: {
            args: Prisma.customer_infoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload>
          }
          update: {
            args: Prisma.customer_infoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload>
          }
          deleteMany: {
            args: Prisma.customer_infoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.customer_infoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.customer_infoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload>[]
          }
          upsert: {
            args: Prisma.customer_infoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$customer_infoPayload>
          }
          aggregate: {
            args: Prisma.Customer_infoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer_info>
          }
          groupBy: {
            args: Prisma.customer_infoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Customer_infoGroupByOutputType>[]
          }
          count: {
            args: Prisma.customer_infoCountArgs<ExtArgs>
            result: $Utils.Optional<Customer_infoCountAggregateOutputType> | number
          }
        }
      }
      institutions: {
        payload: Prisma.$institutionsPayload<ExtArgs>
        fields: Prisma.institutionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.institutionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.institutionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload>
          }
          findFirst: {
            args: Prisma.institutionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.institutionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload>
          }
          findMany: {
            args: Prisma.institutionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload>[]
          }
          create: {
            args: Prisma.institutionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload>
          }
          createMany: {
            args: Prisma.institutionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.institutionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload>[]
          }
          delete: {
            args: Prisma.institutionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload>
          }
          update: {
            args: Prisma.institutionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload>
          }
          deleteMany: {
            args: Prisma.institutionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.institutionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.institutionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload>[]
          }
          upsert: {
            args: Prisma.institutionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institutionsPayload>
          }
          aggregate: {
            args: Prisma.InstitutionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstitutions>
          }
          groupBy: {
            args: Prisma.institutionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstitutionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.institutionsCountArgs<ExtArgs>
            result: $Utils.Optional<InstitutionsCountAggregateOutputType> | number
          }
        }
      }
      institution_region_year: {
        payload: Prisma.$institution_region_yearPayload<ExtArgs>
        fields: Prisma.institution_region_yearFieldRefs
        operations: {
          findUnique: {
            args: Prisma.institution_region_yearFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.institution_region_yearFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload>
          }
          findFirst: {
            args: Prisma.institution_region_yearFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.institution_region_yearFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload>
          }
          findMany: {
            args: Prisma.institution_region_yearFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload>[]
          }
          create: {
            args: Prisma.institution_region_yearCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload>
          }
          createMany: {
            args: Prisma.institution_region_yearCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.institution_region_yearCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload>[]
          }
          delete: {
            args: Prisma.institution_region_yearDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload>
          }
          update: {
            args: Prisma.institution_region_yearUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload>
          }
          deleteMany: {
            args: Prisma.institution_region_yearDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.institution_region_yearUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.institution_region_yearUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload>[]
          }
          upsert: {
            args: Prisma.institution_region_yearUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_region_yearPayload>
          }
          aggregate: {
            args: Prisma.Institution_region_yearAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstitution_region_year>
          }
          groupBy: {
            args: Prisma.institution_region_yearGroupByArgs<ExtArgs>
            result: $Utils.Optional<Institution_region_yearGroupByOutputType>[]
          }
          count: {
            args: Prisma.institution_region_yearCountArgs<ExtArgs>
            result: $Utils.Optional<Institution_region_yearCountAggregateOutputType> | number
          }
        }
      }
      institution_type_year: {
        payload: Prisma.$institution_type_yearPayload<ExtArgs>
        fields: Prisma.institution_type_yearFieldRefs
        operations: {
          findUnique: {
            args: Prisma.institution_type_yearFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.institution_type_yearFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload>
          }
          findFirst: {
            args: Prisma.institution_type_yearFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.institution_type_yearFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload>
          }
          findMany: {
            args: Prisma.institution_type_yearFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload>[]
          }
          create: {
            args: Prisma.institution_type_yearCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload>
          }
          createMany: {
            args: Prisma.institution_type_yearCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.institution_type_yearCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload>[]
          }
          delete: {
            args: Prisma.institution_type_yearDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload>
          }
          update: {
            args: Prisma.institution_type_yearUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload>
          }
          deleteMany: {
            args: Prisma.institution_type_yearDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.institution_type_yearUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.institution_type_yearUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload>[]
          }
          upsert: {
            args: Prisma.institution_type_yearUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$institution_type_yearPayload>
          }
          aggregate: {
            args: Prisma.Institution_type_yearAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstitution_type_year>
          }
          groupBy: {
            args: Prisma.institution_type_yearGroupByArgs<ExtArgs>
            result: $Utils.Optional<Institution_type_yearGroupByOutputType>[]
          }
          count: {
            args: Prisma.institution_type_yearCountArgs<ExtArgs>
            result: $Utils.Optional<Institution_type_yearCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user_info?: user_infoOmit
    customer_info?: customer_infoOmit
    institutions?: institutionsOmit
    institution_region_year?: institution_region_yearOmit
    institution_type_year?: institution_type_yearOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model user_info
   */

  export type AggregateUser_info = {
    _count: User_infoCountAggregateOutputType | null
    _min: User_infoMinAggregateOutputType | null
    _max: User_infoMaxAggregateOutputType | null
  }

  export type User_infoMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    company: string | null
    address: string | null
    last_login: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type User_infoMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    company: string | null
    address: string | null
    last_login: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type User_infoCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    company: number
    address: number
    last_login: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type User_infoMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    company?: true
    address?: true
    last_login?: true
    created_at?: true
    updated_at?: true
  }

  export type User_infoMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    company?: true
    address?: true
    last_login?: true
    created_at?: true
    updated_at?: true
  }

  export type User_infoCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    company?: true
    address?: true
    last_login?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type User_infoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_info to aggregate.
     */
    where?: user_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_infos to fetch.
     */
    orderBy?: user_infoOrderByWithRelationInput | user_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_infos
    **/
    _count?: true | User_infoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_infoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_infoMaxAggregateInputType
  }

  export type GetUser_infoAggregateType<T extends User_infoAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_info]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_info[P]>
      : GetScalarType<T[P], AggregateUser_info[P]>
  }




  export type user_infoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_infoWhereInput
    orderBy?: user_infoOrderByWithAggregationInput | user_infoOrderByWithAggregationInput[]
    by: User_infoScalarFieldEnum[] | User_infoScalarFieldEnum
    having?: user_infoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_infoCountAggregateInputType | true
    _min?: User_infoMinAggregateInputType
    _max?: User_infoMaxAggregateInputType
  }

  export type User_infoGroupByOutputType = {
    id: string
    email: string
    name: string | null
    image: string | null
    company: string | null
    address: string | null
    last_login: Date | null
    created_at: Date | null
    updated_at: Date | null
    _count: User_infoCountAggregateOutputType | null
    _min: User_infoMinAggregateOutputType | null
    _max: User_infoMaxAggregateOutputType | null
  }

  type GetUser_infoGroupByPayload<T extends user_infoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_infoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_infoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_infoGroupByOutputType[P]>
            : GetScalarType<T[P], User_infoGroupByOutputType[P]>
        }
      >
    >


  export type user_infoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    company?: boolean
    address?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user_info"]>

  export type user_infoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    company?: boolean
    address?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user_info"]>

  export type user_infoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    company?: boolean
    address?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user_info"]>

  export type user_infoSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    company?: boolean
    address?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type user_infoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "image" | "company" | "address" | "last_login" | "created_at" | "updated_at", ExtArgs["result"]["user_info"]>

  export type $user_infoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_info"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      image: string | null
      company: string | null
      address: string | null
      last_login: Date | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["user_info"]>
    composites: {}
  }

  type user_infoGetPayload<S extends boolean | null | undefined | user_infoDefaultArgs> = $Result.GetResult<Prisma.$user_infoPayload, S>

  type user_infoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_infoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_infoCountAggregateInputType | true
    }

  export interface user_infoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_info'], meta: { name: 'user_info' } }
    /**
     * Find zero or one User_info that matches the filter.
     * @param {user_infoFindUniqueArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_infoFindUniqueArgs>(args: SelectSubset<T, user_infoFindUniqueArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_info that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_infoFindUniqueOrThrowArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_infoFindUniqueOrThrowArgs>(args: SelectSubset<T, user_infoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_info that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoFindFirstArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_infoFindFirstArgs>(args?: SelectSubset<T, user_infoFindFirstArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_info that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoFindFirstOrThrowArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_infoFindFirstOrThrowArgs>(args?: SelectSubset<T, user_infoFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_infos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_infos
     * const user_infos = await prisma.user_info.findMany()
     * 
     * // Get first 10 User_infos
     * const user_infos = await prisma.user_info.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_infoWithIdOnly = await prisma.user_info.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_infoFindManyArgs>(args?: SelectSubset<T, user_infoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_info.
     * @param {user_infoCreateArgs} args - Arguments to create a User_info.
     * @example
     * // Create one User_info
     * const User_info = await prisma.user_info.create({
     *   data: {
     *     // ... data to create a User_info
     *   }
     * })
     * 
     */
    create<T extends user_infoCreateArgs>(args: SelectSubset<T, user_infoCreateArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_infos.
     * @param {user_infoCreateManyArgs} args - Arguments to create many User_infos.
     * @example
     * // Create many User_infos
     * const user_info = await prisma.user_info.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_infoCreateManyArgs>(args?: SelectSubset<T, user_infoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_infos and returns the data saved in the database.
     * @param {user_infoCreateManyAndReturnArgs} args - Arguments to create many User_infos.
     * @example
     * // Create many User_infos
     * const user_info = await prisma.user_info.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_infos and only return the `id`
     * const user_infoWithIdOnly = await prisma.user_info.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_infoCreateManyAndReturnArgs>(args?: SelectSubset<T, user_infoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_info.
     * @param {user_infoDeleteArgs} args - Arguments to delete one User_info.
     * @example
     * // Delete one User_info
     * const User_info = await prisma.user_info.delete({
     *   where: {
     *     // ... filter to delete one User_info
     *   }
     * })
     * 
     */
    delete<T extends user_infoDeleteArgs>(args: SelectSubset<T, user_infoDeleteArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_info.
     * @param {user_infoUpdateArgs} args - Arguments to update one User_info.
     * @example
     * // Update one User_info
     * const user_info = await prisma.user_info.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_infoUpdateArgs>(args: SelectSubset<T, user_infoUpdateArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_infos.
     * @param {user_infoDeleteManyArgs} args - Arguments to filter User_infos to delete.
     * @example
     * // Delete a few User_infos
     * const { count } = await prisma.user_info.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_infoDeleteManyArgs>(args?: SelectSubset<T, user_infoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_infos
     * const user_info = await prisma.user_info.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_infoUpdateManyArgs>(args: SelectSubset<T, user_infoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_infos and returns the data updated in the database.
     * @param {user_infoUpdateManyAndReturnArgs} args - Arguments to update many User_infos.
     * @example
     * // Update many User_infos
     * const user_info = await prisma.user_info.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_infos and only return the `id`
     * const user_infoWithIdOnly = await prisma.user_info.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_infoUpdateManyAndReturnArgs>(args: SelectSubset<T, user_infoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_info.
     * @param {user_infoUpsertArgs} args - Arguments to update or create a User_info.
     * @example
     * // Update or create a User_info
     * const user_info = await prisma.user_info.upsert({
     *   create: {
     *     // ... data to create a User_info
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_info we want to update
     *   }
     * })
     */
    upsert<T extends user_infoUpsertArgs>(args: SelectSubset<T, user_infoUpsertArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoCountArgs} args - Arguments to filter User_infos to count.
     * @example
     * // Count the number of User_infos
     * const count = await prisma.user_info.count({
     *   where: {
     *     // ... the filter for the User_infos we want to count
     *   }
     * })
    **/
    count<T extends user_infoCountArgs>(
      args?: Subset<T, user_infoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_infoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_infoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_infoAggregateArgs>(args: Subset<T, User_infoAggregateArgs>): Prisma.PrismaPromise<GetUser_infoAggregateType<T>>

    /**
     * Group by User_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_infoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_infoGroupByArgs['orderBy'] }
        : { orderBy?: user_infoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_infoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_infoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_info model
   */
  readonly fields: user_infoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_info.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_infoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_info model
   */
  interface user_infoFieldRefs {
    readonly id: FieldRef<"user_info", 'String'>
    readonly email: FieldRef<"user_info", 'String'>
    readonly name: FieldRef<"user_info", 'String'>
    readonly image: FieldRef<"user_info", 'String'>
    readonly company: FieldRef<"user_info", 'String'>
    readonly address: FieldRef<"user_info", 'String'>
    readonly last_login: FieldRef<"user_info", 'DateTime'>
    readonly created_at: FieldRef<"user_info", 'DateTime'>
    readonly updated_at: FieldRef<"user_info", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_info findUnique
   */
  export type user_infoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Filter, which user_info to fetch.
     */
    where: user_infoWhereUniqueInput
  }

  /**
   * user_info findUniqueOrThrow
   */
  export type user_infoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Filter, which user_info to fetch.
     */
    where: user_infoWhereUniqueInput
  }

  /**
   * user_info findFirst
   */
  export type user_infoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Filter, which user_info to fetch.
     */
    where?: user_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_infos to fetch.
     */
    orderBy?: user_infoOrderByWithRelationInput | user_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_infos.
     */
    cursor?: user_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_infos.
     */
    distinct?: User_infoScalarFieldEnum | User_infoScalarFieldEnum[]
  }

  /**
   * user_info findFirstOrThrow
   */
  export type user_infoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Filter, which user_info to fetch.
     */
    where?: user_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_infos to fetch.
     */
    orderBy?: user_infoOrderByWithRelationInput | user_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_infos.
     */
    cursor?: user_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_infos.
     */
    distinct?: User_infoScalarFieldEnum | User_infoScalarFieldEnum[]
  }

  /**
   * user_info findMany
   */
  export type user_infoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Filter, which user_infos to fetch.
     */
    where?: user_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_infos to fetch.
     */
    orderBy?: user_infoOrderByWithRelationInput | user_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_infos.
     */
    cursor?: user_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_infos.
     */
    skip?: number
    distinct?: User_infoScalarFieldEnum | User_infoScalarFieldEnum[]
  }

  /**
   * user_info create
   */
  export type user_infoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * The data needed to create a user_info.
     */
    data: XOR<user_infoCreateInput, user_infoUncheckedCreateInput>
  }

  /**
   * user_info createMany
   */
  export type user_infoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_infos.
     */
    data: user_infoCreateManyInput | user_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_info createManyAndReturn
   */
  export type user_infoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * The data used to create many user_infos.
     */
    data: user_infoCreateManyInput | user_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_info update
   */
  export type user_infoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * The data needed to update a user_info.
     */
    data: XOR<user_infoUpdateInput, user_infoUncheckedUpdateInput>
    /**
     * Choose, which user_info to update.
     */
    where: user_infoWhereUniqueInput
  }

  /**
   * user_info updateMany
   */
  export type user_infoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_infos.
     */
    data: XOR<user_infoUpdateManyMutationInput, user_infoUncheckedUpdateManyInput>
    /**
     * Filter which user_infos to update
     */
    where?: user_infoWhereInput
    /**
     * Limit how many user_infos to update.
     */
    limit?: number
  }

  /**
   * user_info updateManyAndReturn
   */
  export type user_infoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * The data used to update user_infos.
     */
    data: XOR<user_infoUpdateManyMutationInput, user_infoUncheckedUpdateManyInput>
    /**
     * Filter which user_infos to update
     */
    where?: user_infoWhereInput
    /**
     * Limit how many user_infos to update.
     */
    limit?: number
  }

  /**
   * user_info upsert
   */
  export type user_infoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * The filter to search for the user_info to update in case it exists.
     */
    where: user_infoWhereUniqueInput
    /**
     * In case the user_info found by the `where` argument doesn't exist, create a new user_info with this data.
     */
    create: XOR<user_infoCreateInput, user_infoUncheckedCreateInput>
    /**
     * In case the user_info was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_infoUpdateInput, user_infoUncheckedUpdateInput>
  }

  /**
   * user_info delete
   */
  export type user_infoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Filter which user_info to delete.
     */
    where: user_infoWhereUniqueInput
  }

  /**
   * user_info deleteMany
   */
  export type user_infoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_infos to delete
     */
    where?: user_infoWhereInput
    /**
     * Limit how many user_infos to delete.
     */
    limit?: number
  }

  /**
   * user_info without action
   */
  export type user_infoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
  }


  /**
   * Model customer_info
   */

  export type AggregateCustomer_info = {
    _count: Customer_infoCountAggregateOutputType | null
    _avg: Customer_infoAvgAggregateOutputType | null
    _sum: Customer_infoSumAggregateOutputType | null
    _min: Customer_infoMinAggregateOutputType | null
    _max: Customer_infoMaxAggregateOutputType | null
  }

  export type Customer_infoAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
    lat_company: number | null
    lng_company: number | null
  }

  export type Customer_infoSumAggregateOutputType = {
    lat: number | null
    lng: number | null
    lat_company: number | null
    lng_company: number | null
  }

  export type Customer_infoMinAggregateOutputType = {
    id: string | null
    customer_name: string | null
    email: string | null
    phone: string | null
    mobile: string | null
    address: string | null
    lat: number | null
    lng: number | null
    comment: string | null
    company: string | null
    position: string | null
    tier: string | null
    created_at: Date | null
    updated_at: Date | null
    address_company: string | null
    lat_company: number | null
    lng_company: number | null
    created_by: string | null
  }

  export type Customer_infoMaxAggregateOutputType = {
    id: string | null
    customer_name: string | null
    email: string | null
    phone: string | null
    mobile: string | null
    address: string | null
    lat: number | null
    lng: number | null
    comment: string | null
    company: string | null
    position: string | null
    tier: string | null
    created_at: Date | null
    updated_at: Date | null
    address_company: string | null
    lat_company: number | null
    lng_company: number | null
    created_by: string | null
  }

  export type Customer_infoCountAggregateOutputType = {
    id: number
    customer_name: number
    email: number
    phone: number
    mobile: number
    address: number
    lat: number
    lng: number
    comment: number
    company: number
    position: number
    tier: number
    created_at: number
    updated_at: number
    address_company: number
    lat_company: number
    lng_company: number
    created_by: number
    _all: number
  }


  export type Customer_infoAvgAggregateInputType = {
    lat?: true
    lng?: true
    lat_company?: true
    lng_company?: true
  }

  export type Customer_infoSumAggregateInputType = {
    lat?: true
    lng?: true
    lat_company?: true
    lng_company?: true
  }

  export type Customer_infoMinAggregateInputType = {
    id?: true
    customer_name?: true
    email?: true
    phone?: true
    mobile?: true
    address?: true
    lat?: true
    lng?: true
    comment?: true
    company?: true
    position?: true
    tier?: true
    created_at?: true
    updated_at?: true
    address_company?: true
    lat_company?: true
    lng_company?: true
    created_by?: true
  }

  export type Customer_infoMaxAggregateInputType = {
    id?: true
    customer_name?: true
    email?: true
    phone?: true
    mobile?: true
    address?: true
    lat?: true
    lng?: true
    comment?: true
    company?: true
    position?: true
    tier?: true
    created_at?: true
    updated_at?: true
    address_company?: true
    lat_company?: true
    lng_company?: true
    created_by?: true
  }

  export type Customer_infoCountAggregateInputType = {
    id?: true
    customer_name?: true
    email?: true
    phone?: true
    mobile?: true
    address?: true
    lat?: true
    lng?: true
    comment?: true
    company?: true
    position?: true
    tier?: true
    created_at?: true
    updated_at?: true
    address_company?: true
    lat_company?: true
    lng_company?: true
    created_by?: true
    _all?: true
  }

  export type Customer_infoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which customer_info to aggregate.
     */
    where?: customer_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of customer_infos to fetch.
     */
    orderBy?: customer_infoOrderByWithRelationInput | customer_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: customer_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` customer_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` customer_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned customer_infos
    **/
    _count?: true | Customer_infoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Customer_infoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Customer_infoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Customer_infoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Customer_infoMaxAggregateInputType
  }

  export type GetCustomer_infoAggregateType<T extends Customer_infoAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer_info]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer_info[P]>
      : GetScalarType<T[P], AggregateCustomer_info[P]>
  }




  export type customer_infoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: customer_infoWhereInput
    orderBy?: customer_infoOrderByWithAggregationInput | customer_infoOrderByWithAggregationInput[]
    by: Customer_infoScalarFieldEnum[] | Customer_infoScalarFieldEnum
    having?: customer_infoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Customer_infoCountAggregateInputType | true
    _avg?: Customer_infoAvgAggregateInputType
    _sum?: Customer_infoSumAggregateInputType
    _min?: Customer_infoMinAggregateInputType
    _max?: Customer_infoMaxAggregateInputType
  }

  export type Customer_infoGroupByOutputType = {
    id: string
    customer_name: string
    email: string | null
    phone: string | null
    mobile: string | null
    address: string | null
    lat: number | null
    lng: number | null
    comment: string | null
    company: string | null
    position: string | null
    tier: string | null
    created_at: Date | null
    updated_at: Date | null
    address_company: string | null
    lat_company: number | null
    lng_company: number | null
    created_by: string | null
    _count: Customer_infoCountAggregateOutputType | null
    _avg: Customer_infoAvgAggregateOutputType | null
    _sum: Customer_infoSumAggregateOutputType | null
    _min: Customer_infoMinAggregateOutputType | null
    _max: Customer_infoMaxAggregateOutputType | null
  }

  type GetCustomer_infoGroupByPayload<T extends customer_infoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Customer_infoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Customer_infoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Customer_infoGroupByOutputType[P]>
            : GetScalarType<T[P], Customer_infoGroupByOutputType[P]>
        }
      >
    >


  export type customer_infoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customer_name?: boolean
    email?: boolean
    phone?: boolean
    mobile?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
    comment?: boolean
    company?: boolean
    position?: boolean
    tier?: boolean
    created_at?: boolean
    updated_at?: boolean
    address_company?: boolean
    lat_company?: boolean
    lng_company?: boolean
    created_by?: boolean
  }, ExtArgs["result"]["customer_info"]>

  export type customer_infoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customer_name?: boolean
    email?: boolean
    phone?: boolean
    mobile?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
    comment?: boolean
    company?: boolean
    position?: boolean
    tier?: boolean
    created_at?: boolean
    updated_at?: boolean
    address_company?: boolean
    lat_company?: boolean
    lng_company?: boolean
    created_by?: boolean
  }, ExtArgs["result"]["customer_info"]>

  export type customer_infoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customer_name?: boolean
    email?: boolean
    phone?: boolean
    mobile?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
    comment?: boolean
    company?: boolean
    position?: boolean
    tier?: boolean
    created_at?: boolean
    updated_at?: boolean
    address_company?: boolean
    lat_company?: boolean
    lng_company?: boolean
    created_by?: boolean
  }, ExtArgs["result"]["customer_info"]>

  export type customer_infoSelectScalar = {
    id?: boolean
    customer_name?: boolean
    email?: boolean
    phone?: boolean
    mobile?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
    comment?: boolean
    company?: boolean
    position?: boolean
    tier?: boolean
    created_at?: boolean
    updated_at?: boolean
    address_company?: boolean
    lat_company?: boolean
    lng_company?: boolean
    created_by?: boolean
  }

  export type customer_infoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customer_name" | "email" | "phone" | "mobile" | "address" | "lat" | "lng" | "comment" | "company" | "position" | "tier" | "created_at" | "updated_at" | "address_company" | "lat_company" | "lng_company" | "created_by", ExtArgs["result"]["customer_info"]>

  export type $customer_infoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "customer_info"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customer_name: string
      email: string | null
      phone: string | null
      mobile: string | null
      address: string | null
      lat: number | null
      lng: number | null
      comment: string | null
      company: string | null
      position: string | null
      tier: string | null
      created_at: Date | null
      updated_at: Date | null
      address_company: string | null
      lat_company: number | null
      lng_company: number | null
      created_by: string | null
    }, ExtArgs["result"]["customer_info"]>
    composites: {}
  }

  type customer_infoGetPayload<S extends boolean | null | undefined | customer_infoDefaultArgs> = $Result.GetResult<Prisma.$customer_infoPayload, S>

  type customer_infoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<customer_infoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Customer_infoCountAggregateInputType | true
    }

  export interface customer_infoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['customer_info'], meta: { name: 'customer_info' } }
    /**
     * Find zero or one Customer_info that matches the filter.
     * @param {customer_infoFindUniqueArgs} args - Arguments to find a Customer_info
     * @example
     * // Get one Customer_info
     * const customer_info = await prisma.customer_info.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends customer_infoFindUniqueArgs>(args: SelectSubset<T, customer_infoFindUniqueArgs<ExtArgs>>): Prisma__customer_infoClient<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer_info that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {customer_infoFindUniqueOrThrowArgs} args - Arguments to find a Customer_info
     * @example
     * // Get one Customer_info
     * const customer_info = await prisma.customer_info.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends customer_infoFindUniqueOrThrowArgs>(args: SelectSubset<T, customer_infoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__customer_infoClient<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer_info that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customer_infoFindFirstArgs} args - Arguments to find a Customer_info
     * @example
     * // Get one Customer_info
     * const customer_info = await prisma.customer_info.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends customer_infoFindFirstArgs>(args?: SelectSubset<T, customer_infoFindFirstArgs<ExtArgs>>): Prisma__customer_infoClient<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer_info that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customer_infoFindFirstOrThrowArgs} args - Arguments to find a Customer_info
     * @example
     * // Get one Customer_info
     * const customer_info = await prisma.customer_info.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends customer_infoFindFirstOrThrowArgs>(args?: SelectSubset<T, customer_infoFindFirstOrThrowArgs<ExtArgs>>): Prisma__customer_infoClient<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customer_infos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customer_infoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customer_infos
     * const customer_infos = await prisma.customer_info.findMany()
     * 
     * // Get first 10 Customer_infos
     * const customer_infos = await prisma.customer_info.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customer_infoWithIdOnly = await prisma.customer_info.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends customer_infoFindManyArgs>(args?: SelectSubset<T, customer_infoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer_info.
     * @param {customer_infoCreateArgs} args - Arguments to create a Customer_info.
     * @example
     * // Create one Customer_info
     * const Customer_info = await prisma.customer_info.create({
     *   data: {
     *     // ... data to create a Customer_info
     *   }
     * })
     * 
     */
    create<T extends customer_infoCreateArgs>(args: SelectSubset<T, customer_infoCreateArgs<ExtArgs>>): Prisma__customer_infoClient<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customer_infos.
     * @param {customer_infoCreateManyArgs} args - Arguments to create many Customer_infos.
     * @example
     * // Create many Customer_infos
     * const customer_info = await prisma.customer_info.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends customer_infoCreateManyArgs>(args?: SelectSubset<T, customer_infoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customer_infos and returns the data saved in the database.
     * @param {customer_infoCreateManyAndReturnArgs} args - Arguments to create many Customer_infos.
     * @example
     * // Create many Customer_infos
     * const customer_info = await prisma.customer_info.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customer_infos and only return the `id`
     * const customer_infoWithIdOnly = await prisma.customer_info.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends customer_infoCreateManyAndReturnArgs>(args?: SelectSubset<T, customer_infoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer_info.
     * @param {customer_infoDeleteArgs} args - Arguments to delete one Customer_info.
     * @example
     * // Delete one Customer_info
     * const Customer_info = await prisma.customer_info.delete({
     *   where: {
     *     // ... filter to delete one Customer_info
     *   }
     * })
     * 
     */
    delete<T extends customer_infoDeleteArgs>(args: SelectSubset<T, customer_infoDeleteArgs<ExtArgs>>): Prisma__customer_infoClient<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer_info.
     * @param {customer_infoUpdateArgs} args - Arguments to update one Customer_info.
     * @example
     * // Update one Customer_info
     * const customer_info = await prisma.customer_info.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends customer_infoUpdateArgs>(args: SelectSubset<T, customer_infoUpdateArgs<ExtArgs>>): Prisma__customer_infoClient<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customer_infos.
     * @param {customer_infoDeleteManyArgs} args - Arguments to filter Customer_infos to delete.
     * @example
     * // Delete a few Customer_infos
     * const { count } = await prisma.customer_info.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends customer_infoDeleteManyArgs>(args?: SelectSubset<T, customer_infoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customer_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customer_infoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customer_infos
     * const customer_info = await prisma.customer_info.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends customer_infoUpdateManyArgs>(args: SelectSubset<T, customer_infoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customer_infos and returns the data updated in the database.
     * @param {customer_infoUpdateManyAndReturnArgs} args - Arguments to update many Customer_infos.
     * @example
     * // Update many Customer_infos
     * const customer_info = await prisma.customer_info.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customer_infos and only return the `id`
     * const customer_infoWithIdOnly = await prisma.customer_info.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends customer_infoUpdateManyAndReturnArgs>(args: SelectSubset<T, customer_infoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer_info.
     * @param {customer_infoUpsertArgs} args - Arguments to update or create a Customer_info.
     * @example
     * // Update or create a Customer_info
     * const customer_info = await prisma.customer_info.upsert({
     *   create: {
     *     // ... data to create a Customer_info
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer_info we want to update
     *   }
     * })
     */
    upsert<T extends customer_infoUpsertArgs>(args: SelectSubset<T, customer_infoUpsertArgs<ExtArgs>>): Prisma__customer_infoClient<$Result.GetResult<Prisma.$customer_infoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customer_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customer_infoCountArgs} args - Arguments to filter Customer_infos to count.
     * @example
     * // Count the number of Customer_infos
     * const count = await prisma.customer_info.count({
     *   where: {
     *     // ... the filter for the Customer_infos we want to count
     *   }
     * })
    **/
    count<T extends customer_infoCountArgs>(
      args?: Subset<T, customer_infoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Customer_infoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Customer_infoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Customer_infoAggregateArgs>(args: Subset<T, Customer_infoAggregateArgs>): Prisma.PrismaPromise<GetCustomer_infoAggregateType<T>>

    /**
     * Group by Customer_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {customer_infoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends customer_infoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: customer_infoGroupByArgs['orderBy'] }
        : { orderBy?: customer_infoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, customer_infoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomer_infoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the customer_info model
   */
  readonly fields: customer_infoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for customer_info.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__customer_infoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the customer_info model
   */
  interface customer_infoFieldRefs {
    readonly id: FieldRef<"customer_info", 'String'>
    readonly customer_name: FieldRef<"customer_info", 'String'>
    readonly email: FieldRef<"customer_info", 'String'>
    readonly phone: FieldRef<"customer_info", 'String'>
    readonly mobile: FieldRef<"customer_info", 'String'>
    readonly address: FieldRef<"customer_info", 'String'>
    readonly lat: FieldRef<"customer_info", 'Float'>
    readonly lng: FieldRef<"customer_info", 'Float'>
    readonly comment: FieldRef<"customer_info", 'String'>
    readonly company: FieldRef<"customer_info", 'String'>
    readonly position: FieldRef<"customer_info", 'String'>
    readonly tier: FieldRef<"customer_info", 'String'>
    readonly created_at: FieldRef<"customer_info", 'DateTime'>
    readonly updated_at: FieldRef<"customer_info", 'DateTime'>
    readonly address_company: FieldRef<"customer_info", 'String'>
    readonly lat_company: FieldRef<"customer_info", 'Float'>
    readonly lng_company: FieldRef<"customer_info", 'Float'>
    readonly created_by: FieldRef<"customer_info", 'String'>
  }
    

  // Custom InputTypes
  /**
   * customer_info findUnique
   */
  export type customer_infoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * Filter, which customer_info to fetch.
     */
    where: customer_infoWhereUniqueInput
  }

  /**
   * customer_info findUniqueOrThrow
   */
  export type customer_infoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * Filter, which customer_info to fetch.
     */
    where: customer_infoWhereUniqueInput
  }

  /**
   * customer_info findFirst
   */
  export type customer_infoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * Filter, which customer_info to fetch.
     */
    where?: customer_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of customer_infos to fetch.
     */
    orderBy?: customer_infoOrderByWithRelationInput | customer_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for customer_infos.
     */
    cursor?: customer_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` customer_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` customer_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of customer_infos.
     */
    distinct?: Customer_infoScalarFieldEnum | Customer_infoScalarFieldEnum[]
  }

  /**
   * customer_info findFirstOrThrow
   */
  export type customer_infoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * Filter, which customer_info to fetch.
     */
    where?: customer_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of customer_infos to fetch.
     */
    orderBy?: customer_infoOrderByWithRelationInput | customer_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for customer_infos.
     */
    cursor?: customer_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` customer_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` customer_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of customer_infos.
     */
    distinct?: Customer_infoScalarFieldEnum | Customer_infoScalarFieldEnum[]
  }

  /**
   * customer_info findMany
   */
  export type customer_infoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * Filter, which customer_infos to fetch.
     */
    where?: customer_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of customer_infos to fetch.
     */
    orderBy?: customer_infoOrderByWithRelationInput | customer_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing customer_infos.
     */
    cursor?: customer_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` customer_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` customer_infos.
     */
    skip?: number
    distinct?: Customer_infoScalarFieldEnum | Customer_infoScalarFieldEnum[]
  }

  /**
   * customer_info create
   */
  export type customer_infoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * The data needed to create a customer_info.
     */
    data: XOR<customer_infoCreateInput, customer_infoUncheckedCreateInput>
  }

  /**
   * customer_info createMany
   */
  export type customer_infoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many customer_infos.
     */
    data: customer_infoCreateManyInput | customer_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * customer_info createManyAndReturn
   */
  export type customer_infoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * The data used to create many customer_infos.
     */
    data: customer_infoCreateManyInput | customer_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * customer_info update
   */
  export type customer_infoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * The data needed to update a customer_info.
     */
    data: XOR<customer_infoUpdateInput, customer_infoUncheckedUpdateInput>
    /**
     * Choose, which customer_info to update.
     */
    where: customer_infoWhereUniqueInput
  }

  /**
   * customer_info updateMany
   */
  export type customer_infoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update customer_infos.
     */
    data: XOR<customer_infoUpdateManyMutationInput, customer_infoUncheckedUpdateManyInput>
    /**
     * Filter which customer_infos to update
     */
    where?: customer_infoWhereInput
    /**
     * Limit how many customer_infos to update.
     */
    limit?: number
  }

  /**
   * customer_info updateManyAndReturn
   */
  export type customer_infoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * The data used to update customer_infos.
     */
    data: XOR<customer_infoUpdateManyMutationInput, customer_infoUncheckedUpdateManyInput>
    /**
     * Filter which customer_infos to update
     */
    where?: customer_infoWhereInput
    /**
     * Limit how many customer_infos to update.
     */
    limit?: number
  }

  /**
   * customer_info upsert
   */
  export type customer_infoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * The filter to search for the customer_info to update in case it exists.
     */
    where: customer_infoWhereUniqueInput
    /**
     * In case the customer_info found by the `where` argument doesn't exist, create a new customer_info with this data.
     */
    create: XOR<customer_infoCreateInput, customer_infoUncheckedCreateInput>
    /**
     * In case the customer_info was found with the provided `where` argument, update it with this data.
     */
    update: XOR<customer_infoUpdateInput, customer_infoUncheckedUpdateInput>
  }

  /**
   * customer_info delete
   */
  export type customer_infoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
    /**
     * Filter which customer_info to delete.
     */
    where: customer_infoWhereUniqueInput
  }

  /**
   * customer_info deleteMany
   */
  export type customer_infoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which customer_infos to delete
     */
    where?: customer_infoWhereInput
    /**
     * Limit how many customer_infos to delete.
     */
    limit?: number
  }

  /**
   * customer_info without action
   */
  export type customer_infoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the customer_info
     */
    select?: customer_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the customer_info
     */
    omit?: customer_infoOmit<ExtArgs> | null
  }


  /**
   * Model institutions
   */

  export type AggregateInstitutions = {
    _count: InstitutionsCountAggregateOutputType | null
    _avg: InstitutionsAvgAggregateOutputType | null
    _sum: InstitutionsSumAggregateOutputType | null
    _min: InstitutionsMinAggregateOutputType | null
    _max: InstitutionsMaxAggregateOutputType | null
  }

  export type InstitutionsAvgAggregateOutputType = {
    id: number | null
    lat: Decimal | null
    lng: Decimal | null
  }

  export type InstitutionsSumAggregateOutputType = {
    id: number | null
    lat: Decimal | null
    lng: Decimal | null
  }

  export type InstitutionsMinAggregateOutputType = {
    id: number | null
    name: string | null
    open_date: string | null
    phone: string | null
    address: string | null
    type: string | null
    lat: Decimal | null
    lng: Decimal | null
    created_at: Date | null
  }

  export type InstitutionsMaxAggregateOutputType = {
    id: number | null
    name: string | null
    open_date: string | null
    phone: string | null
    address: string | null
    type: string | null
    lat: Decimal | null
    lng: Decimal | null
    created_at: Date | null
  }

  export type InstitutionsCountAggregateOutputType = {
    id: number
    name: number
    open_date: number
    phone: number
    address: number
    type: number
    lat: number
    lng: number
    created_at: number
    _all: number
  }


  export type InstitutionsAvgAggregateInputType = {
    id?: true
    lat?: true
    lng?: true
  }

  export type InstitutionsSumAggregateInputType = {
    id?: true
    lat?: true
    lng?: true
  }

  export type InstitutionsMinAggregateInputType = {
    id?: true
    name?: true
    open_date?: true
    phone?: true
    address?: true
    type?: true
    lat?: true
    lng?: true
    created_at?: true
  }

  export type InstitutionsMaxAggregateInputType = {
    id?: true
    name?: true
    open_date?: true
    phone?: true
    address?: true
    type?: true
    lat?: true
    lng?: true
    created_at?: true
  }

  export type InstitutionsCountAggregateInputType = {
    id?: true
    name?: true
    open_date?: true
    phone?: true
    address?: true
    type?: true
    lat?: true
    lng?: true
    created_at?: true
    _all?: true
  }

  export type InstitutionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which institutions to aggregate.
     */
    where?: institutionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institutions to fetch.
     */
    orderBy?: institutionsOrderByWithRelationInput | institutionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: institutionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned institutions
    **/
    _count?: true | InstitutionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstitutionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstitutionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstitutionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstitutionsMaxAggregateInputType
  }

  export type GetInstitutionsAggregateType<T extends InstitutionsAggregateArgs> = {
        [P in keyof T & keyof AggregateInstitutions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstitutions[P]>
      : GetScalarType<T[P], AggregateInstitutions[P]>
  }




  export type institutionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: institutionsWhereInput
    orderBy?: institutionsOrderByWithAggregationInput | institutionsOrderByWithAggregationInput[]
    by: InstitutionsScalarFieldEnum[] | InstitutionsScalarFieldEnum
    having?: institutionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstitutionsCountAggregateInputType | true
    _avg?: InstitutionsAvgAggregateInputType
    _sum?: InstitutionsSumAggregateInputType
    _min?: InstitutionsMinAggregateInputType
    _max?: InstitutionsMaxAggregateInputType
  }

  export type InstitutionsGroupByOutputType = {
    id: number
    name: string
    open_date: string | null
    phone: string | null
    address: string | null
    type: string | null
    lat: Decimal | null
    lng: Decimal | null
    created_at: Date | null
    _count: InstitutionsCountAggregateOutputType | null
    _avg: InstitutionsAvgAggregateOutputType | null
    _sum: InstitutionsSumAggregateOutputType | null
    _min: InstitutionsMinAggregateOutputType | null
    _max: InstitutionsMaxAggregateOutputType | null
  }

  type GetInstitutionsGroupByPayload<T extends institutionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstitutionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstitutionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstitutionsGroupByOutputType[P]>
            : GetScalarType<T[P], InstitutionsGroupByOutputType[P]>
        }
      >
    >


  export type institutionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    open_date?: boolean
    phone?: boolean
    address?: boolean
    type?: boolean
    lat?: boolean
    lng?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["institutions"]>

  export type institutionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    open_date?: boolean
    phone?: boolean
    address?: boolean
    type?: boolean
    lat?: boolean
    lng?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["institutions"]>

  export type institutionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    open_date?: boolean
    phone?: boolean
    address?: boolean
    type?: boolean
    lat?: boolean
    lng?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["institutions"]>

  export type institutionsSelectScalar = {
    id?: boolean
    name?: boolean
    open_date?: boolean
    phone?: boolean
    address?: boolean
    type?: boolean
    lat?: boolean
    lng?: boolean
    created_at?: boolean
  }

  export type institutionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "open_date" | "phone" | "address" | "type" | "lat" | "lng" | "created_at", ExtArgs["result"]["institutions"]>

  export type $institutionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "institutions"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      open_date: string | null
      phone: string | null
      address: string | null
      type: string | null
      lat: Prisma.Decimal | null
      lng: Prisma.Decimal | null
      created_at: Date | null
    }, ExtArgs["result"]["institutions"]>
    composites: {}
  }

  type institutionsGetPayload<S extends boolean | null | undefined | institutionsDefaultArgs> = $Result.GetResult<Prisma.$institutionsPayload, S>

  type institutionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<institutionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InstitutionsCountAggregateInputType | true
    }

  export interface institutionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['institutions'], meta: { name: 'institutions' } }
    /**
     * Find zero or one Institutions that matches the filter.
     * @param {institutionsFindUniqueArgs} args - Arguments to find a Institutions
     * @example
     * // Get one Institutions
     * const institutions = await prisma.institutions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends institutionsFindUniqueArgs>(args: SelectSubset<T, institutionsFindUniqueArgs<ExtArgs>>): Prisma__institutionsClient<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Institutions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {institutionsFindUniqueOrThrowArgs} args - Arguments to find a Institutions
     * @example
     * // Get one Institutions
     * const institutions = await prisma.institutions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends institutionsFindUniqueOrThrowArgs>(args: SelectSubset<T, institutionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__institutionsClient<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Institutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institutionsFindFirstArgs} args - Arguments to find a Institutions
     * @example
     * // Get one Institutions
     * const institutions = await prisma.institutions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends institutionsFindFirstArgs>(args?: SelectSubset<T, institutionsFindFirstArgs<ExtArgs>>): Prisma__institutionsClient<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Institutions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institutionsFindFirstOrThrowArgs} args - Arguments to find a Institutions
     * @example
     * // Get one Institutions
     * const institutions = await prisma.institutions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends institutionsFindFirstOrThrowArgs>(args?: SelectSubset<T, institutionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__institutionsClient<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Institutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institutionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Institutions
     * const institutions = await prisma.institutions.findMany()
     * 
     * // Get first 10 Institutions
     * const institutions = await prisma.institutions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const institutionsWithIdOnly = await prisma.institutions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends institutionsFindManyArgs>(args?: SelectSubset<T, institutionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Institutions.
     * @param {institutionsCreateArgs} args - Arguments to create a Institutions.
     * @example
     * // Create one Institutions
     * const Institutions = await prisma.institutions.create({
     *   data: {
     *     // ... data to create a Institutions
     *   }
     * })
     * 
     */
    create<T extends institutionsCreateArgs>(args: SelectSubset<T, institutionsCreateArgs<ExtArgs>>): Prisma__institutionsClient<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Institutions.
     * @param {institutionsCreateManyArgs} args - Arguments to create many Institutions.
     * @example
     * // Create many Institutions
     * const institutions = await prisma.institutions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends institutionsCreateManyArgs>(args?: SelectSubset<T, institutionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Institutions and returns the data saved in the database.
     * @param {institutionsCreateManyAndReturnArgs} args - Arguments to create many Institutions.
     * @example
     * // Create many Institutions
     * const institutions = await prisma.institutions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Institutions and only return the `id`
     * const institutionsWithIdOnly = await prisma.institutions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends institutionsCreateManyAndReturnArgs>(args?: SelectSubset<T, institutionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Institutions.
     * @param {institutionsDeleteArgs} args - Arguments to delete one Institutions.
     * @example
     * // Delete one Institutions
     * const Institutions = await prisma.institutions.delete({
     *   where: {
     *     // ... filter to delete one Institutions
     *   }
     * })
     * 
     */
    delete<T extends institutionsDeleteArgs>(args: SelectSubset<T, institutionsDeleteArgs<ExtArgs>>): Prisma__institutionsClient<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Institutions.
     * @param {institutionsUpdateArgs} args - Arguments to update one Institutions.
     * @example
     * // Update one Institutions
     * const institutions = await prisma.institutions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends institutionsUpdateArgs>(args: SelectSubset<T, institutionsUpdateArgs<ExtArgs>>): Prisma__institutionsClient<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Institutions.
     * @param {institutionsDeleteManyArgs} args - Arguments to filter Institutions to delete.
     * @example
     * // Delete a few Institutions
     * const { count } = await prisma.institutions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends institutionsDeleteManyArgs>(args?: SelectSubset<T, institutionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Institutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institutionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Institutions
     * const institutions = await prisma.institutions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends institutionsUpdateManyArgs>(args: SelectSubset<T, institutionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Institutions and returns the data updated in the database.
     * @param {institutionsUpdateManyAndReturnArgs} args - Arguments to update many Institutions.
     * @example
     * // Update many Institutions
     * const institutions = await prisma.institutions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Institutions and only return the `id`
     * const institutionsWithIdOnly = await prisma.institutions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends institutionsUpdateManyAndReturnArgs>(args: SelectSubset<T, institutionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Institutions.
     * @param {institutionsUpsertArgs} args - Arguments to update or create a Institutions.
     * @example
     * // Update or create a Institutions
     * const institutions = await prisma.institutions.upsert({
     *   create: {
     *     // ... data to create a Institutions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Institutions we want to update
     *   }
     * })
     */
    upsert<T extends institutionsUpsertArgs>(args: SelectSubset<T, institutionsUpsertArgs<ExtArgs>>): Prisma__institutionsClient<$Result.GetResult<Prisma.$institutionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Institutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institutionsCountArgs} args - Arguments to filter Institutions to count.
     * @example
     * // Count the number of Institutions
     * const count = await prisma.institutions.count({
     *   where: {
     *     // ... the filter for the Institutions we want to count
     *   }
     * })
    **/
    count<T extends institutionsCountArgs>(
      args?: Subset<T, institutionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstitutionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Institutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstitutionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstitutionsAggregateArgs>(args: Subset<T, InstitutionsAggregateArgs>): Prisma.PrismaPromise<GetInstitutionsAggregateType<T>>

    /**
     * Group by Institutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institutionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends institutionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: institutionsGroupByArgs['orderBy'] }
        : { orderBy?: institutionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, institutionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstitutionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the institutions model
   */
  readonly fields: institutionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for institutions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__institutionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the institutions model
   */
  interface institutionsFieldRefs {
    readonly id: FieldRef<"institutions", 'Int'>
    readonly name: FieldRef<"institutions", 'String'>
    readonly open_date: FieldRef<"institutions", 'String'>
    readonly phone: FieldRef<"institutions", 'String'>
    readonly address: FieldRef<"institutions", 'String'>
    readonly type: FieldRef<"institutions", 'String'>
    readonly lat: FieldRef<"institutions", 'Decimal'>
    readonly lng: FieldRef<"institutions", 'Decimal'>
    readonly created_at: FieldRef<"institutions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * institutions findUnique
   */
  export type institutionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * Filter, which institutions to fetch.
     */
    where: institutionsWhereUniqueInput
  }

  /**
   * institutions findUniqueOrThrow
   */
  export type institutionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * Filter, which institutions to fetch.
     */
    where: institutionsWhereUniqueInput
  }

  /**
   * institutions findFirst
   */
  export type institutionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * Filter, which institutions to fetch.
     */
    where?: institutionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institutions to fetch.
     */
    orderBy?: institutionsOrderByWithRelationInput | institutionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for institutions.
     */
    cursor?: institutionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of institutions.
     */
    distinct?: InstitutionsScalarFieldEnum | InstitutionsScalarFieldEnum[]
  }

  /**
   * institutions findFirstOrThrow
   */
  export type institutionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * Filter, which institutions to fetch.
     */
    where?: institutionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institutions to fetch.
     */
    orderBy?: institutionsOrderByWithRelationInput | institutionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for institutions.
     */
    cursor?: institutionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of institutions.
     */
    distinct?: InstitutionsScalarFieldEnum | InstitutionsScalarFieldEnum[]
  }

  /**
   * institutions findMany
   */
  export type institutionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * Filter, which institutions to fetch.
     */
    where?: institutionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institutions to fetch.
     */
    orderBy?: institutionsOrderByWithRelationInput | institutionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing institutions.
     */
    cursor?: institutionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institutions.
     */
    skip?: number
    distinct?: InstitutionsScalarFieldEnum | InstitutionsScalarFieldEnum[]
  }

  /**
   * institutions create
   */
  export type institutionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * The data needed to create a institutions.
     */
    data: XOR<institutionsCreateInput, institutionsUncheckedCreateInput>
  }

  /**
   * institutions createMany
   */
  export type institutionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many institutions.
     */
    data: institutionsCreateManyInput | institutionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * institutions createManyAndReturn
   */
  export type institutionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * The data used to create many institutions.
     */
    data: institutionsCreateManyInput | institutionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * institutions update
   */
  export type institutionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * The data needed to update a institutions.
     */
    data: XOR<institutionsUpdateInput, institutionsUncheckedUpdateInput>
    /**
     * Choose, which institutions to update.
     */
    where: institutionsWhereUniqueInput
  }

  /**
   * institutions updateMany
   */
  export type institutionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update institutions.
     */
    data: XOR<institutionsUpdateManyMutationInput, institutionsUncheckedUpdateManyInput>
    /**
     * Filter which institutions to update
     */
    where?: institutionsWhereInput
    /**
     * Limit how many institutions to update.
     */
    limit?: number
  }

  /**
   * institutions updateManyAndReturn
   */
  export type institutionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * The data used to update institutions.
     */
    data: XOR<institutionsUpdateManyMutationInput, institutionsUncheckedUpdateManyInput>
    /**
     * Filter which institutions to update
     */
    where?: institutionsWhereInput
    /**
     * Limit how many institutions to update.
     */
    limit?: number
  }

  /**
   * institutions upsert
   */
  export type institutionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * The filter to search for the institutions to update in case it exists.
     */
    where: institutionsWhereUniqueInput
    /**
     * In case the institutions found by the `where` argument doesn't exist, create a new institutions with this data.
     */
    create: XOR<institutionsCreateInput, institutionsUncheckedCreateInput>
    /**
     * In case the institutions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<institutionsUpdateInput, institutionsUncheckedUpdateInput>
  }

  /**
   * institutions delete
   */
  export type institutionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
    /**
     * Filter which institutions to delete.
     */
    where: institutionsWhereUniqueInput
  }

  /**
   * institutions deleteMany
   */
  export type institutionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which institutions to delete
     */
    where?: institutionsWhereInput
    /**
     * Limit how many institutions to delete.
     */
    limit?: number
  }

  /**
   * institutions without action
   */
  export type institutionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institutions
     */
    select?: institutionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institutions
     */
    omit?: institutionsOmit<ExtArgs> | null
  }


  /**
   * Model institution_region_year
   */

  export type AggregateInstitution_region_year = {
    _count: Institution_region_yearCountAggregateOutputType | null
    _avg: Institution_region_yearAvgAggregateOutputType | null
    _sum: Institution_region_yearSumAggregateOutputType | null
    _min: Institution_region_yearMinAggregateOutputType | null
    _max: Institution_region_yearMaxAggregateOutputType | null
  }

  export type Institution_region_yearAvgAggregateOutputType = {
    id: number | null
    year: number | null
    count: number | null
  }

  export type Institution_region_yearSumAggregateOutputType = {
    id: number | null
    year: number | null
    count: number | null
  }

  export type Institution_region_yearMinAggregateOutputType = {
    id: number | null
    year: number | null
    region: string | null
    count: number | null
  }

  export type Institution_region_yearMaxAggregateOutputType = {
    id: number | null
    year: number | null
    region: string | null
    count: number | null
  }

  export type Institution_region_yearCountAggregateOutputType = {
    id: number
    year: number
    region: number
    count: number
    _all: number
  }


  export type Institution_region_yearAvgAggregateInputType = {
    id?: true
    year?: true
    count?: true
  }

  export type Institution_region_yearSumAggregateInputType = {
    id?: true
    year?: true
    count?: true
  }

  export type Institution_region_yearMinAggregateInputType = {
    id?: true
    year?: true
    region?: true
    count?: true
  }

  export type Institution_region_yearMaxAggregateInputType = {
    id?: true
    year?: true
    region?: true
    count?: true
  }

  export type Institution_region_yearCountAggregateInputType = {
    id?: true
    year?: true
    region?: true
    count?: true
    _all?: true
  }

  export type Institution_region_yearAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which institution_region_year to aggregate.
     */
    where?: institution_region_yearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institution_region_years to fetch.
     */
    orderBy?: institution_region_yearOrderByWithRelationInput | institution_region_yearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: institution_region_yearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institution_region_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institution_region_years.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned institution_region_years
    **/
    _count?: true | Institution_region_yearCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Institution_region_yearAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Institution_region_yearSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Institution_region_yearMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Institution_region_yearMaxAggregateInputType
  }

  export type GetInstitution_region_yearAggregateType<T extends Institution_region_yearAggregateArgs> = {
        [P in keyof T & keyof AggregateInstitution_region_year]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstitution_region_year[P]>
      : GetScalarType<T[P], AggregateInstitution_region_year[P]>
  }




  export type institution_region_yearGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: institution_region_yearWhereInput
    orderBy?: institution_region_yearOrderByWithAggregationInput | institution_region_yearOrderByWithAggregationInput[]
    by: Institution_region_yearScalarFieldEnum[] | Institution_region_yearScalarFieldEnum
    having?: institution_region_yearScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Institution_region_yearCountAggregateInputType | true
    _avg?: Institution_region_yearAvgAggregateInputType
    _sum?: Institution_region_yearSumAggregateInputType
    _min?: Institution_region_yearMinAggregateInputType
    _max?: Institution_region_yearMaxAggregateInputType
  }

  export type Institution_region_yearGroupByOutputType = {
    id: number
    year: number
    region: string
    count: number
    _count: Institution_region_yearCountAggregateOutputType | null
    _avg: Institution_region_yearAvgAggregateOutputType | null
    _sum: Institution_region_yearSumAggregateOutputType | null
    _min: Institution_region_yearMinAggregateOutputType | null
    _max: Institution_region_yearMaxAggregateOutputType | null
  }

  type GetInstitution_region_yearGroupByPayload<T extends institution_region_yearGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Institution_region_yearGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Institution_region_yearGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Institution_region_yearGroupByOutputType[P]>
            : GetScalarType<T[P], Institution_region_yearGroupByOutputType[P]>
        }
      >
    >


  export type institution_region_yearSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    region?: boolean
    count?: boolean
  }, ExtArgs["result"]["institution_region_year"]>

  export type institution_region_yearSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    region?: boolean
    count?: boolean
  }, ExtArgs["result"]["institution_region_year"]>

  export type institution_region_yearSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    region?: boolean
    count?: boolean
  }, ExtArgs["result"]["institution_region_year"]>

  export type institution_region_yearSelectScalar = {
    id?: boolean
    year?: boolean
    region?: boolean
    count?: boolean
  }

  export type institution_region_yearOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "region" | "count", ExtArgs["result"]["institution_region_year"]>

  export type $institution_region_yearPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "institution_region_year"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      year: number
      region: string
      count: number
    }, ExtArgs["result"]["institution_region_year"]>
    composites: {}
  }

  type institution_region_yearGetPayload<S extends boolean | null | undefined | institution_region_yearDefaultArgs> = $Result.GetResult<Prisma.$institution_region_yearPayload, S>

  type institution_region_yearCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<institution_region_yearFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Institution_region_yearCountAggregateInputType | true
    }

  export interface institution_region_yearDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['institution_region_year'], meta: { name: 'institution_region_year' } }
    /**
     * Find zero or one Institution_region_year that matches the filter.
     * @param {institution_region_yearFindUniqueArgs} args - Arguments to find a Institution_region_year
     * @example
     * // Get one Institution_region_year
     * const institution_region_year = await prisma.institution_region_year.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends institution_region_yearFindUniqueArgs>(args: SelectSubset<T, institution_region_yearFindUniqueArgs<ExtArgs>>): Prisma__institution_region_yearClient<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Institution_region_year that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {institution_region_yearFindUniqueOrThrowArgs} args - Arguments to find a Institution_region_year
     * @example
     * // Get one Institution_region_year
     * const institution_region_year = await prisma.institution_region_year.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends institution_region_yearFindUniqueOrThrowArgs>(args: SelectSubset<T, institution_region_yearFindUniqueOrThrowArgs<ExtArgs>>): Prisma__institution_region_yearClient<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Institution_region_year that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_region_yearFindFirstArgs} args - Arguments to find a Institution_region_year
     * @example
     * // Get one Institution_region_year
     * const institution_region_year = await prisma.institution_region_year.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends institution_region_yearFindFirstArgs>(args?: SelectSubset<T, institution_region_yearFindFirstArgs<ExtArgs>>): Prisma__institution_region_yearClient<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Institution_region_year that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_region_yearFindFirstOrThrowArgs} args - Arguments to find a Institution_region_year
     * @example
     * // Get one Institution_region_year
     * const institution_region_year = await prisma.institution_region_year.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends institution_region_yearFindFirstOrThrowArgs>(args?: SelectSubset<T, institution_region_yearFindFirstOrThrowArgs<ExtArgs>>): Prisma__institution_region_yearClient<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Institution_region_years that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_region_yearFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Institution_region_years
     * const institution_region_years = await prisma.institution_region_year.findMany()
     * 
     * // Get first 10 Institution_region_years
     * const institution_region_years = await prisma.institution_region_year.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const institution_region_yearWithIdOnly = await prisma.institution_region_year.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends institution_region_yearFindManyArgs>(args?: SelectSubset<T, institution_region_yearFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Institution_region_year.
     * @param {institution_region_yearCreateArgs} args - Arguments to create a Institution_region_year.
     * @example
     * // Create one Institution_region_year
     * const Institution_region_year = await prisma.institution_region_year.create({
     *   data: {
     *     // ... data to create a Institution_region_year
     *   }
     * })
     * 
     */
    create<T extends institution_region_yearCreateArgs>(args: SelectSubset<T, institution_region_yearCreateArgs<ExtArgs>>): Prisma__institution_region_yearClient<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Institution_region_years.
     * @param {institution_region_yearCreateManyArgs} args - Arguments to create many Institution_region_years.
     * @example
     * // Create many Institution_region_years
     * const institution_region_year = await prisma.institution_region_year.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends institution_region_yearCreateManyArgs>(args?: SelectSubset<T, institution_region_yearCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Institution_region_years and returns the data saved in the database.
     * @param {institution_region_yearCreateManyAndReturnArgs} args - Arguments to create many Institution_region_years.
     * @example
     * // Create many Institution_region_years
     * const institution_region_year = await prisma.institution_region_year.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Institution_region_years and only return the `id`
     * const institution_region_yearWithIdOnly = await prisma.institution_region_year.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends institution_region_yearCreateManyAndReturnArgs>(args?: SelectSubset<T, institution_region_yearCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Institution_region_year.
     * @param {institution_region_yearDeleteArgs} args - Arguments to delete one Institution_region_year.
     * @example
     * // Delete one Institution_region_year
     * const Institution_region_year = await prisma.institution_region_year.delete({
     *   where: {
     *     // ... filter to delete one Institution_region_year
     *   }
     * })
     * 
     */
    delete<T extends institution_region_yearDeleteArgs>(args: SelectSubset<T, institution_region_yearDeleteArgs<ExtArgs>>): Prisma__institution_region_yearClient<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Institution_region_year.
     * @param {institution_region_yearUpdateArgs} args - Arguments to update one Institution_region_year.
     * @example
     * // Update one Institution_region_year
     * const institution_region_year = await prisma.institution_region_year.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends institution_region_yearUpdateArgs>(args: SelectSubset<T, institution_region_yearUpdateArgs<ExtArgs>>): Prisma__institution_region_yearClient<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Institution_region_years.
     * @param {institution_region_yearDeleteManyArgs} args - Arguments to filter Institution_region_years to delete.
     * @example
     * // Delete a few Institution_region_years
     * const { count } = await prisma.institution_region_year.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends institution_region_yearDeleteManyArgs>(args?: SelectSubset<T, institution_region_yearDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Institution_region_years.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_region_yearUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Institution_region_years
     * const institution_region_year = await prisma.institution_region_year.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends institution_region_yearUpdateManyArgs>(args: SelectSubset<T, institution_region_yearUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Institution_region_years and returns the data updated in the database.
     * @param {institution_region_yearUpdateManyAndReturnArgs} args - Arguments to update many Institution_region_years.
     * @example
     * // Update many Institution_region_years
     * const institution_region_year = await prisma.institution_region_year.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Institution_region_years and only return the `id`
     * const institution_region_yearWithIdOnly = await prisma.institution_region_year.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends institution_region_yearUpdateManyAndReturnArgs>(args: SelectSubset<T, institution_region_yearUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Institution_region_year.
     * @param {institution_region_yearUpsertArgs} args - Arguments to update or create a Institution_region_year.
     * @example
     * // Update or create a Institution_region_year
     * const institution_region_year = await prisma.institution_region_year.upsert({
     *   create: {
     *     // ... data to create a Institution_region_year
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Institution_region_year we want to update
     *   }
     * })
     */
    upsert<T extends institution_region_yearUpsertArgs>(args: SelectSubset<T, institution_region_yearUpsertArgs<ExtArgs>>): Prisma__institution_region_yearClient<$Result.GetResult<Prisma.$institution_region_yearPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Institution_region_years.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_region_yearCountArgs} args - Arguments to filter Institution_region_years to count.
     * @example
     * // Count the number of Institution_region_years
     * const count = await prisma.institution_region_year.count({
     *   where: {
     *     // ... the filter for the Institution_region_years we want to count
     *   }
     * })
    **/
    count<T extends institution_region_yearCountArgs>(
      args?: Subset<T, institution_region_yearCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Institution_region_yearCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Institution_region_year.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Institution_region_yearAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Institution_region_yearAggregateArgs>(args: Subset<T, Institution_region_yearAggregateArgs>): Prisma.PrismaPromise<GetInstitution_region_yearAggregateType<T>>

    /**
     * Group by Institution_region_year.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_region_yearGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends institution_region_yearGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: institution_region_yearGroupByArgs['orderBy'] }
        : { orderBy?: institution_region_yearGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, institution_region_yearGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstitution_region_yearGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the institution_region_year model
   */
  readonly fields: institution_region_yearFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for institution_region_year.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__institution_region_yearClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the institution_region_year model
   */
  interface institution_region_yearFieldRefs {
    readonly id: FieldRef<"institution_region_year", 'Int'>
    readonly year: FieldRef<"institution_region_year", 'Int'>
    readonly region: FieldRef<"institution_region_year", 'String'>
    readonly count: FieldRef<"institution_region_year", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * institution_region_year findUnique
   */
  export type institution_region_yearFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_region_year to fetch.
     */
    where: institution_region_yearWhereUniqueInput
  }

  /**
   * institution_region_year findUniqueOrThrow
   */
  export type institution_region_yearFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_region_year to fetch.
     */
    where: institution_region_yearWhereUniqueInput
  }

  /**
   * institution_region_year findFirst
   */
  export type institution_region_yearFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_region_year to fetch.
     */
    where?: institution_region_yearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institution_region_years to fetch.
     */
    orderBy?: institution_region_yearOrderByWithRelationInput | institution_region_yearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for institution_region_years.
     */
    cursor?: institution_region_yearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institution_region_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institution_region_years.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of institution_region_years.
     */
    distinct?: Institution_region_yearScalarFieldEnum | Institution_region_yearScalarFieldEnum[]
  }

  /**
   * institution_region_year findFirstOrThrow
   */
  export type institution_region_yearFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_region_year to fetch.
     */
    where?: institution_region_yearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institution_region_years to fetch.
     */
    orderBy?: institution_region_yearOrderByWithRelationInput | institution_region_yearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for institution_region_years.
     */
    cursor?: institution_region_yearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institution_region_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institution_region_years.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of institution_region_years.
     */
    distinct?: Institution_region_yearScalarFieldEnum | Institution_region_yearScalarFieldEnum[]
  }

  /**
   * institution_region_year findMany
   */
  export type institution_region_yearFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_region_years to fetch.
     */
    where?: institution_region_yearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institution_region_years to fetch.
     */
    orderBy?: institution_region_yearOrderByWithRelationInput | institution_region_yearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing institution_region_years.
     */
    cursor?: institution_region_yearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institution_region_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institution_region_years.
     */
    skip?: number
    distinct?: Institution_region_yearScalarFieldEnum | Institution_region_yearScalarFieldEnum[]
  }

  /**
   * institution_region_year create
   */
  export type institution_region_yearCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * The data needed to create a institution_region_year.
     */
    data: XOR<institution_region_yearCreateInput, institution_region_yearUncheckedCreateInput>
  }

  /**
   * institution_region_year createMany
   */
  export type institution_region_yearCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many institution_region_years.
     */
    data: institution_region_yearCreateManyInput | institution_region_yearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * institution_region_year createManyAndReturn
   */
  export type institution_region_yearCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * The data used to create many institution_region_years.
     */
    data: institution_region_yearCreateManyInput | institution_region_yearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * institution_region_year update
   */
  export type institution_region_yearUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * The data needed to update a institution_region_year.
     */
    data: XOR<institution_region_yearUpdateInput, institution_region_yearUncheckedUpdateInput>
    /**
     * Choose, which institution_region_year to update.
     */
    where: institution_region_yearWhereUniqueInput
  }

  /**
   * institution_region_year updateMany
   */
  export type institution_region_yearUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update institution_region_years.
     */
    data: XOR<institution_region_yearUpdateManyMutationInput, institution_region_yearUncheckedUpdateManyInput>
    /**
     * Filter which institution_region_years to update
     */
    where?: institution_region_yearWhereInput
    /**
     * Limit how many institution_region_years to update.
     */
    limit?: number
  }

  /**
   * institution_region_year updateManyAndReturn
   */
  export type institution_region_yearUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * The data used to update institution_region_years.
     */
    data: XOR<institution_region_yearUpdateManyMutationInput, institution_region_yearUncheckedUpdateManyInput>
    /**
     * Filter which institution_region_years to update
     */
    where?: institution_region_yearWhereInput
    /**
     * Limit how many institution_region_years to update.
     */
    limit?: number
  }

  /**
   * institution_region_year upsert
   */
  export type institution_region_yearUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * The filter to search for the institution_region_year to update in case it exists.
     */
    where: institution_region_yearWhereUniqueInput
    /**
     * In case the institution_region_year found by the `where` argument doesn't exist, create a new institution_region_year with this data.
     */
    create: XOR<institution_region_yearCreateInput, institution_region_yearUncheckedCreateInput>
    /**
     * In case the institution_region_year was found with the provided `where` argument, update it with this data.
     */
    update: XOR<institution_region_yearUpdateInput, institution_region_yearUncheckedUpdateInput>
  }

  /**
   * institution_region_year delete
   */
  export type institution_region_yearDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
    /**
     * Filter which institution_region_year to delete.
     */
    where: institution_region_yearWhereUniqueInput
  }

  /**
   * institution_region_year deleteMany
   */
  export type institution_region_yearDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which institution_region_years to delete
     */
    where?: institution_region_yearWhereInput
    /**
     * Limit how many institution_region_years to delete.
     */
    limit?: number
  }

  /**
   * institution_region_year without action
   */
  export type institution_region_yearDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_region_year
     */
    select?: institution_region_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_region_year
     */
    omit?: institution_region_yearOmit<ExtArgs> | null
  }


  /**
   * Model institution_type_year
   */

  export type AggregateInstitution_type_year = {
    _count: Institution_type_yearCountAggregateOutputType | null
    _avg: Institution_type_yearAvgAggregateOutputType | null
    _sum: Institution_type_yearSumAggregateOutputType | null
    _min: Institution_type_yearMinAggregateOutputType | null
    _max: Institution_type_yearMaxAggregateOutputType | null
  }

  export type Institution_type_yearAvgAggregateOutputType = {
    id: number | null
    year: number | null
    count: number | null
  }

  export type Institution_type_yearSumAggregateOutputType = {
    id: number | null
    year: number | null
    count: number | null
  }

  export type Institution_type_yearMinAggregateOutputType = {
    id: number | null
    year: number | null
    type: string | null
    count: number | null
  }

  export type Institution_type_yearMaxAggregateOutputType = {
    id: number | null
    year: number | null
    type: string | null
    count: number | null
  }

  export type Institution_type_yearCountAggregateOutputType = {
    id: number
    year: number
    type: number
    count: number
    _all: number
  }


  export type Institution_type_yearAvgAggregateInputType = {
    id?: true
    year?: true
    count?: true
  }

  export type Institution_type_yearSumAggregateInputType = {
    id?: true
    year?: true
    count?: true
  }

  export type Institution_type_yearMinAggregateInputType = {
    id?: true
    year?: true
    type?: true
    count?: true
  }

  export type Institution_type_yearMaxAggregateInputType = {
    id?: true
    year?: true
    type?: true
    count?: true
  }

  export type Institution_type_yearCountAggregateInputType = {
    id?: true
    year?: true
    type?: true
    count?: true
    _all?: true
  }

  export type Institution_type_yearAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which institution_type_year to aggregate.
     */
    where?: institution_type_yearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institution_type_years to fetch.
     */
    orderBy?: institution_type_yearOrderByWithRelationInput | institution_type_yearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: institution_type_yearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institution_type_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institution_type_years.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned institution_type_years
    **/
    _count?: true | Institution_type_yearCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Institution_type_yearAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Institution_type_yearSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Institution_type_yearMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Institution_type_yearMaxAggregateInputType
  }

  export type GetInstitution_type_yearAggregateType<T extends Institution_type_yearAggregateArgs> = {
        [P in keyof T & keyof AggregateInstitution_type_year]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstitution_type_year[P]>
      : GetScalarType<T[P], AggregateInstitution_type_year[P]>
  }




  export type institution_type_yearGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: institution_type_yearWhereInput
    orderBy?: institution_type_yearOrderByWithAggregationInput | institution_type_yearOrderByWithAggregationInput[]
    by: Institution_type_yearScalarFieldEnum[] | Institution_type_yearScalarFieldEnum
    having?: institution_type_yearScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Institution_type_yearCountAggregateInputType | true
    _avg?: Institution_type_yearAvgAggregateInputType
    _sum?: Institution_type_yearSumAggregateInputType
    _min?: Institution_type_yearMinAggregateInputType
    _max?: Institution_type_yearMaxAggregateInputType
  }

  export type Institution_type_yearGroupByOutputType = {
    id: number
    year: number
    type: string
    count: number
    _count: Institution_type_yearCountAggregateOutputType | null
    _avg: Institution_type_yearAvgAggregateOutputType | null
    _sum: Institution_type_yearSumAggregateOutputType | null
    _min: Institution_type_yearMinAggregateOutputType | null
    _max: Institution_type_yearMaxAggregateOutputType | null
  }

  type GetInstitution_type_yearGroupByPayload<T extends institution_type_yearGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Institution_type_yearGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Institution_type_yearGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Institution_type_yearGroupByOutputType[P]>
            : GetScalarType<T[P], Institution_type_yearGroupByOutputType[P]>
        }
      >
    >


  export type institution_type_yearSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    type?: boolean
    count?: boolean
  }, ExtArgs["result"]["institution_type_year"]>

  export type institution_type_yearSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    type?: boolean
    count?: boolean
  }, ExtArgs["result"]["institution_type_year"]>

  export type institution_type_yearSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    type?: boolean
    count?: boolean
  }, ExtArgs["result"]["institution_type_year"]>

  export type institution_type_yearSelectScalar = {
    id?: boolean
    year?: boolean
    type?: boolean
    count?: boolean
  }

  export type institution_type_yearOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "type" | "count", ExtArgs["result"]["institution_type_year"]>

  export type $institution_type_yearPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "institution_type_year"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      year: number
      type: string
      count: number
    }, ExtArgs["result"]["institution_type_year"]>
    composites: {}
  }

  type institution_type_yearGetPayload<S extends boolean | null | undefined | institution_type_yearDefaultArgs> = $Result.GetResult<Prisma.$institution_type_yearPayload, S>

  type institution_type_yearCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<institution_type_yearFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Institution_type_yearCountAggregateInputType | true
    }

  export interface institution_type_yearDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['institution_type_year'], meta: { name: 'institution_type_year' } }
    /**
     * Find zero or one Institution_type_year that matches the filter.
     * @param {institution_type_yearFindUniqueArgs} args - Arguments to find a Institution_type_year
     * @example
     * // Get one Institution_type_year
     * const institution_type_year = await prisma.institution_type_year.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends institution_type_yearFindUniqueArgs>(args: SelectSubset<T, institution_type_yearFindUniqueArgs<ExtArgs>>): Prisma__institution_type_yearClient<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Institution_type_year that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {institution_type_yearFindUniqueOrThrowArgs} args - Arguments to find a Institution_type_year
     * @example
     * // Get one Institution_type_year
     * const institution_type_year = await prisma.institution_type_year.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends institution_type_yearFindUniqueOrThrowArgs>(args: SelectSubset<T, institution_type_yearFindUniqueOrThrowArgs<ExtArgs>>): Prisma__institution_type_yearClient<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Institution_type_year that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_type_yearFindFirstArgs} args - Arguments to find a Institution_type_year
     * @example
     * // Get one Institution_type_year
     * const institution_type_year = await prisma.institution_type_year.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends institution_type_yearFindFirstArgs>(args?: SelectSubset<T, institution_type_yearFindFirstArgs<ExtArgs>>): Prisma__institution_type_yearClient<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Institution_type_year that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_type_yearFindFirstOrThrowArgs} args - Arguments to find a Institution_type_year
     * @example
     * // Get one Institution_type_year
     * const institution_type_year = await prisma.institution_type_year.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends institution_type_yearFindFirstOrThrowArgs>(args?: SelectSubset<T, institution_type_yearFindFirstOrThrowArgs<ExtArgs>>): Prisma__institution_type_yearClient<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Institution_type_years that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_type_yearFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Institution_type_years
     * const institution_type_years = await prisma.institution_type_year.findMany()
     * 
     * // Get first 10 Institution_type_years
     * const institution_type_years = await prisma.institution_type_year.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const institution_type_yearWithIdOnly = await prisma.institution_type_year.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends institution_type_yearFindManyArgs>(args?: SelectSubset<T, institution_type_yearFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Institution_type_year.
     * @param {institution_type_yearCreateArgs} args - Arguments to create a Institution_type_year.
     * @example
     * // Create one Institution_type_year
     * const Institution_type_year = await prisma.institution_type_year.create({
     *   data: {
     *     // ... data to create a Institution_type_year
     *   }
     * })
     * 
     */
    create<T extends institution_type_yearCreateArgs>(args: SelectSubset<T, institution_type_yearCreateArgs<ExtArgs>>): Prisma__institution_type_yearClient<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Institution_type_years.
     * @param {institution_type_yearCreateManyArgs} args - Arguments to create many Institution_type_years.
     * @example
     * // Create many Institution_type_years
     * const institution_type_year = await prisma.institution_type_year.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends institution_type_yearCreateManyArgs>(args?: SelectSubset<T, institution_type_yearCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Institution_type_years and returns the data saved in the database.
     * @param {institution_type_yearCreateManyAndReturnArgs} args - Arguments to create many Institution_type_years.
     * @example
     * // Create many Institution_type_years
     * const institution_type_year = await prisma.institution_type_year.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Institution_type_years and only return the `id`
     * const institution_type_yearWithIdOnly = await prisma.institution_type_year.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends institution_type_yearCreateManyAndReturnArgs>(args?: SelectSubset<T, institution_type_yearCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Institution_type_year.
     * @param {institution_type_yearDeleteArgs} args - Arguments to delete one Institution_type_year.
     * @example
     * // Delete one Institution_type_year
     * const Institution_type_year = await prisma.institution_type_year.delete({
     *   where: {
     *     // ... filter to delete one Institution_type_year
     *   }
     * })
     * 
     */
    delete<T extends institution_type_yearDeleteArgs>(args: SelectSubset<T, institution_type_yearDeleteArgs<ExtArgs>>): Prisma__institution_type_yearClient<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Institution_type_year.
     * @param {institution_type_yearUpdateArgs} args - Arguments to update one Institution_type_year.
     * @example
     * // Update one Institution_type_year
     * const institution_type_year = await prisma.institution_type_year.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends institution_type_yearUpdateArgs>(args: SelectSubset<T, institution_type_yearUpdateArgs<ExtArgs>>): Prisma__institution_type_yearClient<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Institution_type_years.
     * @param {institution_type_yearDeleteManyArgs} args - Arguments to filter Institution_type_years to delete.
     * @example
     * // Delete a few Institution_type_years
     * const { count } = await prisma.institution_type_year.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends institution_type_yearDeleteManyArgs>(args?: SelectSubset<T, institution_type_yearDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Institution_type_years.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_type_yearUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Institution_type_years
     * const institution_type_year = await prisma.institution_type_year.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends institution_type_yearUpdateManyArgs>(args: SelectSubset<T, institution_type_yearUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Institution_type_years and returns the data updated in the database.
     * @param {institution_type_yearUpdateManyAndReturnArgs} args - Arguments to update many Institution_type_years.
     * @example
     * // Update many Institution_type_years
     * const institution_type_year = await prisma.institution_type_year.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Institution_type_years and only return the `id`
     * const institution_type_yearWithIdOnly = await prisma.institution_type_year.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends institution_type_yearUpdateManyAndReturnArgs>(args: SelectSubset<T, institution_type_yearUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Institution_type_year.
     * @param {institution_type_yearUpsertArgs} args - Arguments to update or create a Institution_type_year.
     * @example
     * // Update or create a Institution_type_year
     * const institution_type_year = await prisma.institution_type_year.upsert({
     *   create: {
     *     // ... data to create a Institution_type_year
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Institution_type_year we want to update
     *   }
     * })
     */
    upsert<T extends institution_type_yearUpsertArgs>(args: SelectSubset<T, institution_type_yearUpsertArgs<ExtArgs>>): Prisma__institution_type_yearClient<$Result.GetResult<Prisma.$institution_type_yearPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Institution_type_years.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_type_yearCountArgs} args - Arguments to filter Institution_type_years to count.
     * @example
     * // Count the number of Institution_type_years
     * const count = await prisma.institution_type_year.count({
     *   where: {
     *     // ... the filter for the Institution_type_years we want to count
     *   }
     * })
    **/
    count<T extends institution_type_yearCountArgs>(
      args?: Subset<T, institution_type_yearCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Institution_type_yearCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Institution_type_year.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Institution_type_yearAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Institution_type_yearAggregateArgs>(args: Subset<T, Institution_type_yearAggregateArgs>): Prisma.PrismaPromise<GetInstitution_type_yearAggregateType<T>>

    /**
     * Group by Institution_type_year.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {institution_type_yearGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends institution_type_yearGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: institution_type_yearGroupByArgs['orderBy'] }
        : { orderBy?: institution_type_yearGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, institution_type_yearGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstitution_type_yearGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the institution_type_year model
   */
  readonly fields: institution_type_yearFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for institution_type_year.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__institution_type_yearClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the institution_type_year model
   */
  interface institution_type_yearFieldRefs {
    readonly id: FieldRef<"institution_type_year", 'Int'>
    readonly year: FieldRef<"institution_type_year", 'Int'>
    readonly type: FieldRef<"institution_type_year", 'String'>
    readonly count: FieldRef<"institution_type_year", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * institution_type_year findUnique
   */
  export type institution_type_yearFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_type_year to fetch.
     */
    where: institution_type_yearWhereUniqueInput
  }

  /**
   * institution_type_year findUniqueOrThrow
   */
  export type institution_type_yearFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_type_year to fetch.
     */
    where: institution_type_yearWhereUniqueInput
  }

  /**
   * institution_type_year findFirst
   */
  export type institution_type_yearFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_type_year to fetch.
     */
    where?: institution_type_yearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institution_type_years to fetch.
     */
    orderBy?: institution_type_yearOrderByWithRelationInput | institution_type_yearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for institution_type_years.
     */
    cursor?: institution_type_yearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institution_type_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institution_type_years.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of institution_type_years.
     */
    distinct?: Institution_type_yearScalarFieldEnum | Institution_type_yearScalarFieldEnum[]
  }

  /**
   * institution_type_year findFirstOrThrow
   */
  export type institution_type_yearFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_type_year to fetch.
     */
    where?: institution_type_yearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institution_type_years to fetch.
     */
    orderBy?: institution_type_yearOrderByWithRelationInput | institution_type_yearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for institution_type_years.
     */
    cursor?: institution_type_yearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institution_type_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institution_type_years.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of institution_type_years.
     */
    distinct?: Institution_type_yearScalarFieldEnum | Institution_type_yearScalarFieldEnum[]
  }

  /**
   * institution_type_year findMany
   */
  export type institution_type_yearFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * Filter, which institution_type_years to fetch.
     */
    where?: institution_type_yearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of institution_type_years to fetch.
     */
    orderBy?: institution_type_yearOrderByWithRelationInput | institution_type_yearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing institution_type_years.
     */
    cursor?: institution_type_yearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` institution_type_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` institution_type_years.
     */
    skip?: number
    distinct?: Institution_type_yearScalarFieldEnum | Institution_type_yearScalarFieldEnum[]
  }

  /**
   * institution_type_year create
   */
  export type institution_type_yearCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * The data needed to create a institution_type_year.
     */
    data: XOR<institution_type_yearCreateInput, institution_type_yearUncheckedCreateInput>
  }

  /**
   * institution_type_year createMany
   */
  export type institution_type_yearCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many institution_type_years.
     */
    data: institution_type_yearCreateManyInput | institution_type_yearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * institution_type_year createManyAndReturn
   */
  export type institution_type_yearCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * The data used to create many institution_type_years.
     */
    data: institution_type_yearCreateManyInput | institution_type_yearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * institution_type_year update
   */
  export type institution_type_yearUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * The data needed to update a institution_type_year.
     */
    data: XOR<institution_type_yearUpdateInput, institution_type_yearUncheckedUpdateInput>
    /**
     * Choose, which institution_type_year to update.
     */
    where: institution_type_yearWhereUniqueInput
  }

  /**
   * institution_type_year updateMany
   */
  export type institution_type_yearUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update institution_type_years.
     */
    data: XOR<institution_type_yearUpdateManyMutationInput, institution_type_yearUncheckedUpdateManyInput>
    /**
     * Filter which institution_type_years to update
     */
    where?: institution_type_yearWhereInput
    /**
     * Limit how many institution_type_years to update.
     */
    limit?: number
  }

  /**
   * institution_type_year updateManyAndReturn
   */
  export type institution_type_yearUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * The data used to update institution_type_years.
     */
    data: XOR<institution_type_yearUpdateManyMutationInput, institution_type_yearUncheckedUpdateManyInput>
    /**
     * Filter which institution_type_years to update
     */
    where?: institution_type_yearWhereInput
    /**
     * Limit how many institution_type_years to update.
     */
    limit?: number
  }

  /**
   * institution_type_year upsert
   */
  export type institution_type_yearUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * The filter to search for the institution_type_year to update in case it exists.
     */
    where: institution_type_yearWhereUniqueInput
    /**
     * In case the institution_type_year found by the `where` argument doesn't exist, create a new institution_type_year with this data.
     */
    create: XOR<institution_type_yearCreateInput, institution_type_yearUncheckedCreateInput>
    /**
     * In case the institution_type_year was found with the provided `where` argument, update it with this data.
     */
    update: XOR<institution_type_yearUpdateInput, institution_type_yearUncheckedUpdateInput>
  }

  /**
   * institution_type_year delete
   */
  export type institution_type_yearDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
    /**
     * Filter which institution_type_year to delete.
     */
    where: institution_type_yearWhereUniqueInput
  }

  /**
   * institution_type_year deleteMany
   */
  export type institution_type_yearDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which institution_type_years to delete
     */
    where?: institution_type_yearWhereInput
    /**
     * Limit how many institution_type_years to delete.
     */
    limit?: number
  }

  /**
   * institution_type_year without action
   */
  export type institution_type_yearDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the institution_type_year
     */
    select?: institution_type_yearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the institution_type_year
     */
    omit?: institution_type_yearOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const User_infoScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    image: 'image',
    company: 'company',
    address: 'address',
    last_login: 'last_login',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type User_infoScalarFieldEnum = (typeof User_infoScalarFieldEnum)[keyof typeof User_infoScalarFieldEnum]


  export const Customer_infoScalarFieldEnum: {
    id: 'id',
    customer_name: 'customer_name',
    email: 'email',
    phone: 'phone',
    mobile: 'mobile',
    address: 'address',
    lat: 'lat',
    lng: 'lng',
    comment: 'comment',
    company: 'company',
    position: 'position',
    tier: 'tier',
    created_at: 'created_at',
    updated_at: 'updated_at',
    address_company: 'address_company',
    lat_company: 'lat_company',
    lng_company: 'lng_company',
    created_by: 'created_by'
  };

  export type Customer_infoScalarFieldEnum = (typeof Customer_infoScalarFieldEnum)[keyof typeof Customer_infoScalarFieldEnum]


  export const InstitutionsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    open_date: 'open_date',
    phone: 'phone',
    address: 'address',
    type: 'type',
    lat: 'lat',
    lng: 'lng',
    created_at: 'created_at'
  };

  export type InstitutionsScalarFieldEnum = (typeof InstitutionsScalarFieldEnum)[keyof typeof InstitutionsScalarFieldEnum]


  export const Institution_region_yearScalarFieldEnum: {
    id: 'id',
    year: 'year',
    region: 'region',
    count: 'count'
  };

  export type Institution_region_yearScalarFieldEnum = (typeof Institution_region_yearScalarFieldEnum)[keyof typeof Institution_region_yearScalarFieldEnum]


  export const Institution_type_yearScalarFieldEnum: {
    id: 'id',
    year: 'year',
    type: 'type',
    count: 'count'
  };

  export type Institution_type_yearScalarFieldEnum = (typeof Institution_type_yearScalarFieldEnum)[keyof typeof Institution_type_yearScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    
  /**
   * Deep Input Types
   */


  export type user_infoWhereInput = {
    AND?: user_infoWhereInput | user_infoWhereInput[]
    OR?: user_infoWhereInput[]
    NOT?: user_infoWhereInput | user_infoWhereInput[]
    id?: StringFilter<"user_info"> | string
    email?: StringFilter<"user_info"> | string
    name?: StringNullableFilter<"user_info"> | string | null
    image?: StringNullableFilter<"user_info"> | string | null
    company?: StringNullableFilter<"user_info"> | string | null
    address?: StringNullableFilter<"user_info"> | string | null
    last_login?: DateTimeNullableFilter<"user_info"> | Date | string | null
    created_at?: DateTimeNullableFilter<"user_info"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"user_info"> | Date | string | null
  }

  export type user_infoOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    last_login?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
  }

  export type user_infoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: user_infoWhereInput | user_infoWhereInput[]
    OR?: user_infoWhereInput[]
    NOT?: user_infoWhereInput | user_infoWhereInput[]
    name?: StringNullableFilter<"user_info"> | string | null
    image?: StringNullableFilter<"user_info"> | string | null
    company?: StringNullableFilter<"user_info"> | string | null
    address?: StringNullableFilter<"user_info"> | string | null
    last_login?: DateTimeNullableFilter<"user_info"> | Date | string | null
    created_at?: DateTimeNullableFilter<"user_info"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"user_info"> | Date | string | null
  }, "id" | "email">

  export type user_infoOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    last_login?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: user_infoCountOrderByAggregateInput
    _max?: user_infoMaxOrderByAggregateInput
    _min?: user_infoMinOrderByAggregateInput
  }

  export type user_infoScalarWhereWithAggregatesInput = {
    AND?: user_infoScalarWhereWithAggregatesInput | user_infoScalarWhereWithAggregatesInput[]
    OR?: user_infoScalarWhereWithAggregatesInput[]
    NOT?: user_infoScalarWhereWithAggregatesInput | user_infoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user_info"> | string
    email?: StringWithAggregatesFilter<"user_info"> | string
    name?: StringNullableWithAggregatesFilter<"user_info"> | string | null
    image?: StringNullableWithAggregatesFilter<"user_info"> | string | null
    company?: StringNullableWithAggregatesFilter<"user_info"> | string | null
    address?: StringNullableWithAggregatesFilter<"user_info"> | string | null
    last_login?: DateTimeNullableWithAggregatesFilter<"user_info"> | Date | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"user_info"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"user_info"> | Date | string | null
  }

  export type customer_infoWhereInput = {
    AND?: customer_infoWhereInput | customer_infoWhereInput[]
    OR?: customer_infoWhereInput[]
    NOT?: customer_infoWhereInput | customer_infoWhereInput[]
    id?: StringFilter<"customer_info"> | string
    customer_name?: StringFilter<"customer_info"> | string
    email?: StringNullableFilter<"customer_info"> | string | null
    phone?: StringNullableFilter<"customer_info"> | string | null
    mobile?: StringNullableFilter<"customer_info"> | string | null
    address?: StringNullableFilter<"customer_info"> | string | null
    lat?: FloatNullableFilter<"customer_info"> | number | null
    lng?: FloatNullableFilter<"customer_info"> | number | null
    comment?: StringNullableFilter<"customer_info"> | string | null
    company?: StringNullableFilter<"customer_info"> | string | null
    position?: StringNullableFilter<"customer_info"> | string | null
    tier?: StringNullableFilter<"customer_info"> | string | null
    created_at?: DateTimeNullableFilter<"customer_info"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"customer_info"> | Date | string | null
    address_company?: StringNullableFilter<"customer_info"> | string | null
    lat_company?: FloatNullableFilter<"customer_info"> | number | null
    lng_company?: FloatNullableFilter<"customer_info"> | number | null
    created_by?: StringNullableFilter<"customer_info"> | string | null
  }

  export type customer_infoOrderByWithRelationInput = {
    id?: SortOrder
    customer_name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    tier?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    address_company?: SortOrderInput | SortOrder
    lat_company?: SortOrderInput | SortOrder
    lng_company?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
  }

  export type customer_infoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: customer_infoWhereInput | customer_infoWhereInput[]
    OR?: customer_infoWhereInput[]
    NOT?: customer_infoWhereInput | customer_infoWhereInput[]
    customer_name?: StringFilter<"customer_info"> | string
    email?: StringNullableFilter<"customer_info"> | string | null
    phone?: StringNullableFilter<"customer_info"> | string | null
    mobile?: StringNullableFilter<"customer_info"> | string | null
    address?: StringNullableFilter<"customer_info"> | string | null
    lat?: FloatNullableFilter<"customer_info"> | number | null
    lng?: FloatNullableFilter<"customer_info"> | number | null
    comment?: StringNullableFilter<"customer_info"> | string | null
    company?: StringNullableFilter<"customer_info"> | string | null
    position?: StringNullableFilter<"customer_info"> | string | null
    tier?: StringNullableFilter<"customer_info"> | string | null
    created_at?: DateTimeNullableFilter<"customer_info"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"customer_info"> | Date | string | null
    address_company?: StringNullableFilter<"customer_info"> | string | null
    lat_company?: FloatNullableFilter<"customer_info"> | number | null
    lng_company?: FloatNullableFilter<"customer_info"> | number | null
    created_by?: StringNullableFilter<"customer_info"> | string | null
  }, "id">

  export type customer_infoOrderByWithAggregationInput = {
    id?: SortOrder
    customer_name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    tier?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    address_company?: SortOrderInput | SortOrder
    lat_company?: SortOrderInput | SortOrder
    lng_company?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    _count?: customer_infoCountOrderByAggregateInput
    _avg?: customer_infoAvgOrderByAggregateInput
    _max?: customer_infoMaxOrderByAggregateInput
    _min?: customer_infoMinOrderByAggregateInput
    _sum?: customer_infoSumOrderByAggregateInput
  }

  export type customer_infoScalarWhereWithAggregatesInput = {
    AND?: customer_infoScalarWhereWithAggregatesInput | customer_infoScalarWhereWithAggregatesInput[]
    OR?: customer_infoScalarWhereWithAggregatesInput[]
    NOT?: customer_infoScalarWhereWithAggregatesInput | customer_infoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"customer_info"> | string
    customer_name?: StringWithAggregatesFilter<"customer_info"> | string
    email?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
    phone?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
    mobile?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
    address?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
    lat?: FloatNullableWithAggregatesFilter<"customer_info"> | number | null
    lng?: FloatNullableWithAggregatesFilter<"customer_info"> | number | null
    comment?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
    company?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
    position?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
    tier?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"customer_info"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"customer_info"> | Date | string | null
    address_company?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
    lat_company?: FloatNullableWithAggregatesFilter<"customer_info"> | number | null
    lng_company?: FloatNullableWithAggregatesFilter<"customer_info"> | number | null
    created_by?: StringNullableWithAggregatesFilter<"customer_info"> | string | null
  }

  export type institutionsWhereInput = {
    AND?: institutionsWhereInput | institutionsWhereInput[]
    OR?: institutionsWhereInput[]
    NOT?: institutionsWhereInput | institutionsWhereInput[]
    id?: IntFilter<"institutions"> | number
    name?: StringFilter<"institutions"> | string
    open_date?: StringNullableFilter<"institutions"> | string | null
    phone?: StringNullableFilter<"institutions"> | string | null
    address?: StringNullableFilter<"institutions"> | string | null
    type?: StringNullableFilter<"institutions"> | string | null
    lat?: DecimalNullableFilter<"institutions"> | Decimal | DecimalJsLike | number | string | null
    lng?: DecimalNullableFilter<"institutions"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"institutions"> | Date | string | null
  }

  export type institutionsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    open_date?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
  }

  export type institutionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: institutionsWhereInput | institutionsWhereInput[]
    OR?: institutionsWhereInput[]
    NOT?: institutionsWhereInput | institutionsWhereInput[]
    name?: StringFilter<"institutions"> | string
    open_date?: StringNullableFilter<"institutions"> | string | null
    phone?: StringNullableFilter<"institutions"> | string | null
    address?: StringNullableFilter<"institutions"> | string | null
    type?: StringNullableFilter<"institutions"> | string | null
    lat?: DecimalNullableFilter<"institutions"> | Decimal | DecimalJsLike | number | string | null
    lng?: DecimalNullableFilter<"institutions"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableFilter<"institutions"> | Date | string | null
  }, "id">

  export type institutionsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    open_date?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: institutionsCountOrderByAggregateInput
    _avg?: institutionsAvgOrderByAggregateInput
    _max?: institutionsMaxOrderByAggregateInput
    _min?: institutionsMinOrderByAggregateInput
    _sum?: institutionsSumOrderByAggregateInput
  }

  export type institutionsScalarWhereWithAggregatesInput = {
    AND?: institutionsScalarWhereWithAggregatesInput | institutionsScalarWhereWithAggregatesInput[]
    OR?: institutionsScalarWhereWithAggregatesInput[]
    NOT?: institutionsScalarWhereWithAggregatesInput | institutionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"institutions"> | number
    name?: StringWithAggregatesFilter<"institutions"> | string
    open_date?: StringNullableWithAggregatesFilter<"institutions"> | string | null
    phone?: StringNullableWithAggregatesFilter<"institutions"> | string | null
    address?: StringNullableWithAggregatesFilter<"institutions"> | string | null
    type?: StringNullableWithAggregatesFilter<"institutions"> | string | null
    lat?: DecimalNullableWithAggregatesFilter<"institutions"> | Decimal | DecimalJsLike | number | string | null
    lng?: DecimalNullableWithAggregatesFilter<"institutions"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"institutions"> | Date | string | null
  }

  export type institution_region_yearWhereInput = {
    AND?: institution_region_yearWhereInput | institution_region_yearWhereInput[]
    OR?: institution_region_yearWhereInput[]
    NOT?: institution_region_yearWhereInput | institution_region_yearWhereInput[]
    id?: IntFilter<"institution_region_year"> | number
    year?: IntFilter<"institution_region_year"> | number
    region?: StringFilter<"institution_region_year"> | string
    count?: IntFilter<"institution_region_year"> | number
  }

  export type institution_region_yearOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    region?: SortOrder
    count?: SortOrder
  }

  export type institution_region_yearWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: institution_region_yearWhereInput | institution_region_yearWhereInput[]
    OR?: institution_region_yearWhereInput[]
    NOT?: institution_region_yearWhereInput | institution_region_yearWhereInput[]
    year?: IntFilter<"institution_region_year"> | number
    region?: StringFilter<"institution_region_year"> | string
    count?: IntFilter<"institution_region_year"> | number
  }, "id">

  export type institution_region_yearOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    region?: SortOrder
    count?: SortOrder
    _count?: institution_region_yearCountOrderByAggregateInput
    _avg?: institution_region_yearAvgOrderByAggregateInput
    _max?: institution_region_yearMaxOrderByAggregateInput
    _min?: institution_region_yearMinOrderByAggregateInput
    _sum?: institution_region_yearSumOrderByAggregateInput
  }

  export type institution_region_yearScalarWhereWithAggregatesInput = {
    AND?: institution_region_yearScalarWhereWithAggregatesInput | institution_region_yearScalarWhereWithAggregatesInput[]
    OR?: institution_region_yearScalarWhereWithAggregatesInput[]
    NOT?: institution_region_yearScalarWhereWithAggregatesInput | institution_region_yearScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"institution_region_year"> | number
    year?: IntWithAggregatesFilter<"institution_region_year"> | number
    region?: StringWithAggregatesFilter<"institution_region_year"> | string
    count?: IntWithAggregatesFilter<"institution_region_year"> | number
  }

  export type institution_type_yearWhereInput = {
    AND?: institution_type_yearWhereInput | institution_type_yearWhereInput[]
    OR?: institution_type_yearWhereInput[]
    NOT?: institution_type_yearWhereInput | institution_type_yearWhereInput[]
    id?: IntFilter<"institution_type_year"> | number
    year?: IntFilter<"institution_type_year"> | number
    type?: StringFilter<"institution_type_year"> | string
    count?: IntFilter<"institution_type_year"> | number
  }

  export type institution_type_yearOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type institution_type_yearWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: institution_type_yearWhereInput | institution_type_yearWhereInput[]
    OR?: institution_type_yearWhereInput[]
    NOT?: institution_type_yearWhereInput | institution_type_yearWhereInput[]
    year?: IntFilter<"institution_type_year"> | number
    type?: StringFilter<"institution_type_year"> | string
    count?: IntFilter<"institution_type_year"> | number
  }, "id">

  export type institution_type_yearOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    type?: SortOrder
    count?: SortOrder
    _count?: institution_type_yearCountOrderByAggregateInput
    _avg?: institution_type_yearAvgOrderByAggregateInput
    _max?: institution_type_yearMaxOrderByAggregateInput
    _min?: institution_type_yearMinOrderByAggregateInput
    _sum?: institution_type_yearSumOrderByAggregateInput
  }

  export type institution_type_yearScalarWhereWithAggregatesInput = {
    AND?: institution_type_yearScalarWhereWithAggregatesInput | institution_type_yearScalarWhereWithAggregatesInput[]
    OR?: institution_type_yearScalarWhereWithAggregatesInput[]
    NOT?: institution_type_yearScalarWhereWithAggregatesInput | institution_type_yearScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"institution_type_year"> | number
    year?: IntWithAggregatesFilter<"institution_type_year"> | number
    type?: StringWithAggregatesFilter<"institution_type_year"> | string
    count?: IntWithAggregatesFilter<"institution_type_year"> | number
  }

  export type user_infoCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    company?: string | null
    address?: string | null
    last_login?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type user_infoUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    company?: string | null
    address?: string | null
    last_login?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type user_infoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_infoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_infoCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    company?: string | null
    address?: string | null
    last_login?: Date | string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type user_infoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_infoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type customer_infoCreateInput = {
    id?: string
    customer_name: string
    email?: string | null
    phone?: string | null
    mobile?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
    comment?: string | null
    company?: string | null
    position?: string | null
    tier?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    address_company?: string | null
    lat_company?: number | null
    lng_company?: number | null
    created_by?: string | null
  }

  export type customer_infoUncheckedCreateInput = {
    id?: string
    customer_name: string
    email?: string | null
    phone?: string | null
    mobile?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
    comment?: string | null
    company?: string | null
    position?: string | null
    tier?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    address_company?: string | null
    lat_company?: number | null
    lng_company?: number | null
    created_by?: string | null
  }

  export type customer_infoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address_company?: NullableStringFieldUpdateOperationsInput | string | null
    lat_company?: NullableFloatFieldUpdateOperationsInput | number | null
    lng_company?: NullableFloatFieldUpdateOperationsInput | number | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type customer_infoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address_company?: NullableStringFieldUpdateOperationsInput | string | null
    lat_company?: NullableFloatFieldUpdateOperationsInput | number | null
    lng_company?: NullableFloatFieldUpdateOperationsInput | number | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type customer_infoCreateManyInput = {
    id?: string
    customer_name: string
    email?: string | null
    phone?: string | null
    mobile?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
    comment?: string | null
    company?: string | null
    position?: string | null
    tier?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    address_company?: string | null
    lat_company?: number | null
    lng_company?: number | null
    created_by?: string | null
  }

  export type customer_infoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address_company?: NullableStringFieldUpdateOperationsInput | string | null
    lat_company?: NullableFloatFieldUpdateOperationsInput | number | null
    lng_company?: NullableFloatFieldUpdateOperationsInput | number | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type customer_infoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customer_name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address_company?: NullableStringFieldUpdateOperationsInput | string | null
    lat_company?: NullableFloatFieldUpdateOperationsInput | number | null
    lng_company?: NullableFloatFieldUpdateOperationsInput | number | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type institutionsCreateInput = {
    name: string
    open_date?: string | null
    phone?: string | null
    address?: string | null
    type?: string | null
    lat?: Decimal | DecimalJsLike | number | string | null
    lng?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
  }

  export type institutionsUncheckedCreateInput = {
    id?: number
    name: string
    open_date?: string | null
    phone?: string | null
    address?: string | null
    type?: string | null
    lat?: Decimal | DecimalJsLike | number | string | null
    lng?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
  }

  export type institutionsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    open_date?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lng?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type institutionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    open_date?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lng?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type institutionsCreateManyInput = {
    id?: number
    name: string
    open_date?: string | null
    phone?: string | null
    address?: string | null
    type?: string | null
    lat?: Decimal | DecimalJsLike | number | string | null
    lng?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string | null
  }

  export type institutionsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    open_date?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lng?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type institutionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    open_date?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lng?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type institution_region_yearCreateInput = {
    year: number
    region: string
    count: number
  }

  export type institution_region_yearUncheckedCreateInput = {
    id?: number
    year: number
    region: string
    count: number
  }

  export type institution_region_yearUpdateInput = {
    year?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type institution_region_yearUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type institution_region_yearCreateManyInput = {
    id?: number
    year: number
    region: string
    count: number
  }

  export type institution_region_yearUpdateManyMutationInput = {
    year?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type institution_region_yearUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type institution_type_yearCreateInput = {
    year: number
    type: string
    count: number
  }

  export type institution_type_yearUncheckedCreateInput = {
    id?: number
    year: number
    type: string
    count: number
  }

  export type institution_type_yearUpdateInput = {
    year?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type institution_type_yearUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type institution_type_yearCreateManyInput = {
    id?: number
    year: number
    type: string
    count: number
  }

  export type institution_type_yearUpdateManyMutationInput = {
    year?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type institution_type_yearUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type user_infoCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    company?: SortOrder
    address?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_infoMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    company?: SortOrder
    address?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_infoMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    company?: SortOrder
    address?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type customer_infoCountOrderByAggregateInput = {
    id?: SortOrder
    customer_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    mobile?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    comment?: SortOrder
    company?: SortOrder
    position?: SortOrder
    tier?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    address_company?: SortOrder
    lat_company?: SortOrder
    lng_company?: SortOrder
    created_by?: SortOrder
  }

  export type customer_infoAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
    lat_company?: SortOrder
    lng_company?: SortOrder
  }

  export type customer_infoMaxOrderByAggregateInput = {
    id?: SortOrder
    customer_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    mobile?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    comment?: SortOrder
    company?: SortOrder
    position?: SortOrder
    tier?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    address_company?: SortOrder
    lat_company?: SortOrder
    lng_company?: SortOrder
    created_by?: SortOrder
  }

  export type customer_infoMinOrderByAggregateInput = {
    id?: SortOrder
    customer_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    mobile?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    comment?: SortOrder
    company?: SortOrder
    position?: SortOrder
    tier?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    address_company?: SortOrder
    lat_company?: SortOrder
    lng_company?: SortOrder
    created_by?: SortOrder
  }

  export type customer_infoSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
    lat_company?: SortOrder
    lng_company?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type institutionsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    open_date?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    type?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    created_at?: SortOrder
  }

  export type institutionsAvgOrderByAggregateInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type institutionsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    open_date?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    type?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    created_at?: SortOrder
  }

  export type institutionsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    open_date?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    type?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    created_at?: SortOrder
  }

  export type institutionsSumOrderByAggregateInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type institution_region_yearCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    region?: SortOrder
    count?: SortOrder
  }

  export type institution_region_yearAvgOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    count?: SortOrder
  }

  export type institution_region_yearMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    region?: SortOrder
    count?: SortOrder
  }

  export type institution_region_yearMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    region?: SortOrder
    count?: SortOrder
  }

  export type institution_region_yearSumOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    count?: SortOrder
  }

  export type institution_type_yearCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type institution_type_yearAvgOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    count?: SortOrder
  }

  export type institution_type_yearMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type institution_type_yearMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type institution_type_yearSumOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    count?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}