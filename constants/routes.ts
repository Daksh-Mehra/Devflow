const ROUTES={
    HOME:"/",
    SIGN_IN:"/sign-in",
    SIGN_UP:"/sign-up",
    ASK_QUESTION:"/ask-question",
    QUESTION:(id:string)=>`/questions/${id}`,
    PROFILE:(id:string)=>`/profile/${id}`,
    TAGS:(_id:string)=>`/tags/${_id}`,
    SIGN_IN_WITH_OAUTH:"signin-with-oauth",
};

export default ROUTES