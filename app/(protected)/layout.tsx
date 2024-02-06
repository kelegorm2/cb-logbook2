import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <main className="h-full w-full ">
      <Navbar />
      <div className="p-4 max-w-screen-xl mx-auto flex items-center">
        {children}
      </div>
    </main>
  );
};

export default ProtectedLayout;
