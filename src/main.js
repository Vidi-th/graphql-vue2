import { ApolloClient, HttpLink, InMemoryCache, split } from 
'apollo-boost'
import App from './App.vue' 
import router from './router'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri : 'https://todo-list-graphql.hasura.app/v1/graphql',
})

const wsLink = new WebSocketLink({
  uri:'ws://todo-list-graphql.hasura.app/v1/graphql',
  options: {
      reconnect: true,
  }
});

const link = split(
  ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind == 'OperationDefinition' && definition.operation == 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);

new Vue({
  router,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')