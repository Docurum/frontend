import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar";

export default function AppBar() {
  return (
    <div className="flex flex-row shadow p-4">
      <div className="flex flex-row items-center">
        <Logo className="h-10 w-10" />
        <div className="text-3xl font-bold text-black">doc</div>
        <div className="text-3xl font-bold text-blue-600">urum</div>
      </div>
      <SearchBar />
    </div>
  );
}
