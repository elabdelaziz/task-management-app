type AppLayoutProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const AppLayout = ({ darkMode, toggleDarkMode }: AppLayoutProps) => {
  return (
    // <button onClick={toggleDarkMode}>Toggle</button>
    <div className={`page bg-mainDark`}>
      <h2 className="logo">Logo</h2>
      <nav></nav>
      <section className={`bg-bgDark`}>Content</section>
      <aside>Sidebar</aside>
    </div>
  );
};

export default AppLayout;
