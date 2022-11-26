import { QueryResolvers, Type } from "../../generated/graphql";

const OKQueryResponse = {
  code: 200,
  message: "operation success",
  success: true
};

export const resolvers: QueryResolvers = {
  loginEmail: (args, parent, context) => {
    return {
      token: "",
      queryResponse: OKQueryResponse
    };
  },

  loginPhone: (args, parent, context) => {
    return {
      token: "",
      queryResponse: OKQueryResponse
    };
  },
  logout: (args, parent, context) => {
    return OKQueryResponse;
  },

  me: (args, parent, context) => {
    return {
      id: "",
      first_name: "",
      last_name: "",
      type: Type.Farmer,
      username: ""
    };
  }
};

