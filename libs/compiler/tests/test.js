"use strict";
// import { HttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import fetch from 'node-fetch';
// import { introspectSchema } from 'graphql-tools';
// const userLink = new HttpLink({ uri: 'http://user-api.xxx.com/graphql', fetch });
// const blogLink = new HttpLink({ uri: 'http://blog-api.xxx.com/graphql', fetch });
// const userWrappedLink = setContext((request, previousContext) => ({
//     headers: {
//         'Authentication': `Bearer ${previousContext.graphqlContext.authKey}`,
//     }
// })).concat(userLink);
// const userSchema = await introspectSchema(userWrappedLink);
// const blogSchema = await introspectSchema(blogLink);
// const executableUserSchema = makeRemoteExecutableSchema({
//     userSchema,
//     userLink,
// });
// const executableBlogSchema = makeRemoteExecutableSchema({
//     blogSchema,
//     blogLink,
// });
// const schema = mergeSchemas({
//     schemas: [executableUserSchema, executableBlogSchema],
// });
//# sourceMappingURL=test.js.map