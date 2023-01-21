import { systemActions } from '@Redux/domains/system/actions';

export namespace systemTypes {
  export type TActionUnion =
    | ReturnType<typeof systemActions.hydrate>
    | ReturnType<typeof systemActions.socketStatusSet>
}
