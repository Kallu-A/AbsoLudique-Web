import cabinet from "../components/cabinet";
import useUser from "../lib/useUser";

export default function Cabinet() {
  const { user } = useUser({ redirectTo: '/login' })

  return (
    <>
        {cabinet()}
    </>
  );
}
