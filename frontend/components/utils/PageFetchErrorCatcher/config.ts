export type TConfigUrlPattern = string;

export type TConfigRule = {
  actionsNames: string[],
  handler?: () => Promise<FIXME>
}

export const config: Record<TConfigUrlPattern, TConfigRule> = {
  '/.*': {
    actionsNames: [

    ],
  },
};
