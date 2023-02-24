import dynamic from 'next/dynamic';
import { newGetUser } from "../firebase-service";

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

export default function Index() {
  newGetUser().then((user) => {
    console.log("user", user);
  });
  return <App />;
}
