interface RootState {
  user: User | undefined;
  errors: ResponseError;
}

type Action = ActionSetErrors | ActionCleanErrors | ActionUpdateUser | { type: '' }

interface ActionSetErrors {
  type: 'SET_ERRORS';
  errors: ResponseError;
}

interface ActionCleanErrors {
  type: 'CLEAN_ERRORS';
}

interface ActionUpdateUser {
  type: 'UPDATE_USER';
  user?: Profile | User;
}
