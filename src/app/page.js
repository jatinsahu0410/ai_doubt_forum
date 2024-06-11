import Main from "@/components/Main/mainComponent";
import SideBar from "@/components/sidebar";

export default function Home() {
  return (
    <div className= 'flex gap-2 w-[100vw] h-[100vh] overflow-hidden text-black'>
      <SideBar />
      <Main />
    </div>
  );
}
