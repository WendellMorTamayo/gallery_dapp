import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import GifList from "./GifList.jsx";

export function Filter({gifList, myGifList, removeGif, wallet, likeGif}) {
    const data = [
        {
            label: "Dashboard",
            value: "dashboard",
            icon: Square3Stack3DIcon,
        },
        {
            label: "My Collections",
            value: "profile",
            icon: UserCircleIcon,
        },
    ];

    const renderTabContent = (value) => {
        switch (value) {
            case "dashboard":
                return <GifList gifList={gifList} removeGif={removeGif} wallet={wallet} likeGif={likeGif}
                />;
            case "profile":
                return <GifList gifList={myGifList} removeGif={removeGif} wallet={wallet}/>;
            default:
                return null;
        }
    };
    return (
        <Tabs className={"z-0"} value="dashboard">
            <TabsHeader className={"h-16 w-3/4 mx-auto items-center mt-2 justify-center flex relative"}>
                {data.map(({label, value, icon}) => (
                    <Tab key={value} value={value}>
                        <div className="flex items-center gap-2">
                            {React.createElement(icon, {className: "w-5 h-5"})}
                            {label}
                        </div>
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody className={"w-full items-center z-0 mt-2 justify-center flex relative"}>
                {data.map(({value}) => (
                    <TabPanel className={"w-fit"} key={value} value={value}>
                        {renderTabContent(value)}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}

export default Filter;