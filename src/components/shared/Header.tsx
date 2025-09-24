import ConnectBtn from "../common/ConnectBtn";

const navItems = [
  {
    label: "Learn",
    href: "/learn",
  },
  {
    label: "Developers",
    href: "/developers",
  },
  {
    label: "Community",
    href: "/community",
  },
  {
    label: "Showcase",
    href: "/showcase",
  },
];

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a className="text-2xl font-bold" href="/">
          Dolphinder
        </a>
        <nav className="flex items-center space-x-4">
          {navItems.map(item => (
            <a href={item.href} className="text-white/90" key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <ConnectBtn />
      </div>
    </header>
  );
};

export default Header;
