import DefaultLayout from "../layouts/default";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TrackCard from "../components/TrackCard";
import { CircleChartCard } from "../components/RadialChart";
import { Icon } from "@iconify/react";
import { tracks } from "../config/content";
import ProfileBadge from "../components/ProfileBadge";
import { motion } from "motion/react";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

export default function DashboardPage() {
    const [user, setUser] = useState({
        username: "",
        xp: 0,
        level: 1,
        coins: 0,
        badges: []
    });
    const [xpData, setXPData] = useState({
        level: 1,
        xpProgress: 0,
        xpToNextLevel: 100,
        totalXPForNextLevel: 100,
    });

    const determineXPToNextLevel = (xp) => {
        let level = 1;
        let xpForNextLevel = 100; // XP required for the next level
        let totalXPForNextLevel = 100; // Cumulative XP needed for the next level

        while (xp >= totalXPForNextLevel) {
            xp -= totalXPForNextLevel; // Subtract cumulative XP needed for the current level
            level++;
            xpForNextLevel += 100; // Increase the XP required for the next level
            totalXPForNextLevel = xpForNextLevel; // Update cumulative XP for the next level
        }

        return {
            level,
            xpProgress: xp,
            xpToNextLevel: totalXPForNextLevel - xp, // Correctly calculate XP left to the next level
            totalXPForNextLevel
        };
    };

    const getCPRCompletion = () => {
        if(!user.courses || user.courses.length === 0) return 0;
        var completion = user.courses[0].modules;
        var modulesNumber = user.courses[0].modules.length;
        var completedModules = completion.filter(module => module.completed).length;
        return (completedModules / modulesNumber) * 100;
    };

    useEffect(() => {
        document.title = "Dashboard - MediLearn";
        const accountToken = localStorage.getItem("accountToken");
        axiosInstance.post("/auth/checkuser/", {token: accountToken}).then((res) => {
            setUser(res.data.user);
            setXPData(determineXPToNextLevel(res.data.user.xp));
        });
    }, []);

    return (
        <DefaultLayout>
            <div className="mt-4">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <p className="text-lg font-light">
                    Welcome to your dashboard, <span className="font-bold">{user.username}!</span>
                </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.5 }}
                >
                    <CircleChartCard title="XP" color="danger" total={10000} chartData={[{name: "Total XP", value: parseFloat(user.xp), fill: "hsl(var(--nextui-primary))"}]} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.5 }}
                >
                    <CircleChartCard title={`Level: ${xpData.level}`} color="danger" total={xpData.totalXPForNextLevel} chartData={[{name: "XP To Next Level", value: xpData.xpProgress, toNext: xpData.xpToNextLevel, fill: "hsl(var(--nextui-primary))"}]} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card classNames={{ base: "h-[240px] border border-transparent dark:border-default-100" }} radius="sm">
                        <div className="flex justify-center text-center items-center h-full">
                            <div>
                                <div className="flex justify-center text-center items-center mb-2">
                                    <Icon icon="tabler:coin-filled" width={32} height={32} />
                                </div>
                                <p className="fill-default-500 text-tiny" dy="-0.5em" x="50%">
                                    Coins
                                </p>
                                <p className="fill-foreground text-xl font-semibold" dy="1.5em" x="50%">
                                    {user.coins}
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card classNames={{ base: "h-[240px] border border-transparent dark:border-default-100" }} radius="sm">
                        <div className="flex flex-col gap-y-2 p-4 pb-0">
                            <div className="flex items-center justify-between gap-x-2">
                                <dt>
                                    <h3 className="text-small font-medium text-default-500">Badges</h3>
                                </dt>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                            {
                                user.badges.map((badge) => (
                                    <ProfileBadge key={`${badge.xp}-${badge.name}`} name={badge.name} description={badge.description} icon={badge.icon} xp={badge.xp} />
                                ))
                            }
                        </div>
                    </Card>
                </motion.div>
            </div>
            <div className="mt-2">
                <h2 className="text-2xl font-bold">Training Tracks</h2>
            </div>
            <div className="flex w-full flex-col mt-4">
                <Tabs aria-label="Options" isVertical={true}>
                    <Tab key="emt" title="EMT">
                        <Card classNames={{ base: "bg-zinc-200 dark:bg-zinc-800 w-full" }}>
                            <CardBody className="w-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-4">
                                    {tracks.emtTrack.map((track) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            whileHover={{ y: -5 }}
                                            transition={{ duration: 0.5 }}
                                            key={track.id}
                                        >
                                            <TrackCard track={track} completion={getCPRCompletion} />
                                        </motion.div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </DefaultLayout>
    );
}
