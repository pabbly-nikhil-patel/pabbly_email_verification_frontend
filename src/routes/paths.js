// ----------------------------------------------------------------------



const ROOTS = {
  AUTH: '/auth',
  app: '/app',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-app/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
      forgotpassword: `${ROOTS.AUTH}/jwt/forgot-password`,
      confirm: `${ROOTS.AUTH}/jwt/confirm`,
      rest: `${ROOTS.AUTH}/jwt/rest`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // app
  app: {
    root: ROOTS.app,
    // reports: `${ROOTS.app}/reports`,
    // credits: `${ROOTS.app}/credits`,
    gethelp: `${ROOTS.app}/gethelp`,
    settings: {
      root: `${ROOTS.app}/settings`,
      credits: `${ROOTS.app}/settings/credits`,
      api: `${ROOTS.app}/settings/api`,
      timezone: `${ROOTS.app}/settings/timezone`,
      teamMembers: `${ROOTS.app}/settings/team-members`,
     
    },
  },
};
