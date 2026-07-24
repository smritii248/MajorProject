import { useState } from "react";
import StatusBar from "./components/StatusBar";
import BottomNav from "./components/BottomNav";
import HomeScreen from "./screens/HomeScreen";
import ReportScreen from "./screens/ReportScreen";
import PlacesScreen from "./screens/PlacesScreen";
import MarketScreen from "./screens/MarketScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default function App() {
  const [tab, setTab] = useState("home");     // home | scan | market | profile
  const [screen, setScreen] = useState("home"); // home | report | places

  function handleTab(t) {
    setTab(t);
    if (t === "home" || t === "scan") setScreen("home");
    if (t === "market") setScreen("market");
    if (t === "profile") setScreen("profile");
  }

  let page;
  if (screen === "report") {
    page = <ReportScreen goBack={() => setScreen("home")} goPlaces={() => setScreen("places")} />;
  } else if (screen === "places") {
    page = <PlacesScreen goBack={() => setScreen("report")} />;
  } else if (tab === "market") {
    page = <MarketScreen />;
  } else if (tab === "profile") {
    page = <ProfileScreen />;
  } else {
    page = <HomeScreen goReport={() => setScreen("report")} />;
  }

  const navActive = screen === "places" || screen === "report" ? "home" : tab;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200 py-8">
      <div className="w-[375px] h-[760px] rounded-[40px] overflow-hidden flex flex-col shadow-2xl bg-[#FAF9F4]">
        <StatusBar />
        {page}
        <BottomNav active={navActive} onChange={handleTab} />
      </div>
    </div>
  );
}
