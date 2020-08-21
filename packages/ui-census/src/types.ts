export type UIAdapterSelector<E> = (
  element: E,
  query?: {
    [key: string]: string | number | boolean;
  }
) => E | E[];
export type UIAdapterSelectors<E> = {
  [key: string]: UIAdapterSelector<E>;
};

export type Query<E, T extends UIAdapterSelector<E>> = Parameters<T>[1];

export type UIAdapterProps<E> = { [key: string]: (element: E) => any };
export type UIAdapterPropsObjects<E> = {
  [key: string]: UIAdapterProps<E>;
};

export type Props<E, T extends UIAdapterProps<E>> = {
  [P in keyof T]: ReturnType<T[P]>;
};

export type UIAdapterElement<E, O extends UIAdapterProps<E>> = Props<E, O> & {
  element: E;
};
export type QueryById<E, O extends UIAdapterProps<E>> = {
  q: (query: string) => UIAdapterElement<E, O>;
};
export type QueryByProp<
  E,
  O extends UIAdapterProps<E>,
  Q extends UIAdapterSelector<E>
> = {
  q: (query: Partial<Query<E, Q>>) => Array<UIAdapterElement<E, O>>;
};
export type UIAdapterImplementation<
  E,
  S extends UIAdapterSelectors<E>,
  P extends UIAdapterPropsObjects<E>,
  T extends keyof S & keyof P
> = {
  [K in T]: UIAdapterElement<E, P[K]> &
    QueryById<E, P[K]> &
    QueryByProp<E, P[K], S[K]>;
};
