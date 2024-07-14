const LogoutPage = () => {
  localStorage.removeItem("loggedIn");
  window.location.href = "/";
  return (
    <main className="h-[76vh] mx-2 bg-green-600 px-4 border-green-600">
      <div className="lg:h-[76vh] rounded-lg bg-white relative py-2"></div>
    </main>
  );
};

export default LogoutPage;
