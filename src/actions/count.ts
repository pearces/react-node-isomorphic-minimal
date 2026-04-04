export const INCREMENT = 'INCREMENT' as const;

export type IncrementAction = {
  type: typeof INCREMENT;
};

export const increment = (): IncrementAction => ({
  type: INCREMENT
});
