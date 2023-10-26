import { useEffect } from "react";

function App() {
  const {
    onStartReplay,
    onStopReplay,
    onRegisterSentry,
    onDestroy,
    onIdentify
  } = useSentry();

  useEffect(() => {
    // onRegisterSentry prohibits repeated execution
    console.log("1111");
    onRegisterSentry();
    onIdentify({
      username: `${userId}-${companyId}-${employeeId || ""}`,
      email
    });
    onStartReplay();
    return () => {
      onDestroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onIdentify, onDestroy, onStartReplay, onRegisterSentry]);

  useEffect(() => {
    if ("change role") {
      onStopReplay();
      console.log("change role");
      onIdentify({
        username: `${userId}-${companyId}-${employeeId || ""}`,
        email
      });
      onStartReplay();
    }
  }, [onIdentify, onStartReplay, onStopReplay]);

  return (
    <div>
      <p>App</p>
    </div>
  );
}

export default App;
