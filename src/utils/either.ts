// original source from package: @sweet-monads/either, author: Artem Kobzar
// https://github.com/JSMonk/sweet-monads/tree/master/either

const enum EitherType {
  Left = 'Left',
  Right = 'Right'
}

export type Either<L, R> =
  // eslint-disable-next-line no-use-before-define
  | EitherConstructor<L, R, EitherType.Right>
  // eslint-disable-next-line no-use-before-define
  | EitherConstructor<L, R, EitherType.Left>

class EitherConstructor<L, R, T extends EitherType = EitherType> {
  static success<L, T> (v: T): Either<L, T> {
    return new EitherConstructor<L, T, EitherType.Right>(EitherType.Right, v)
  }

  static fail<T, R> (v: T): Either<T, R> {
    return new EitherConstructor<T, R, EitherType.Left>(EitherType.Left, v)
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor (
    private readonly type: T,
    public readonly value: T extends EitherType.Left ? L : R,
  ) {}

  isFail (): this is EitherConstructor<L, R, EitherType.Left> {
    return this.type === EitherType.Left
  }

  isOk (): this is EitherConstructor<L, R, EitherType.Right> {
    return this.type === EitherType.Right
  }
}

export const { fail, success } = EitherConstructor

export const isEither = <L, R>(
  value: unknown | Either<L, R>,
): value is Either<L, R> => value instanceof EitherConstructor
