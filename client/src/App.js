import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <h1>This is app page</h1>
      </div>
    </ApolloProvider>
  );
}
