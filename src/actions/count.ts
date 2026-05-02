export const INCREMENT = 'INCREMENT' as const;

export interface IncrementAction {
  type: typeof INCREMENT;
}

export const increment = (): IncrementAction => ({
  type: INCREMENT
});
