import DefaultLayout from "../layouts/default";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TrackCard from "../components/TrackCard";
import { CircleChartCard } from "../components/RadialChart";
import { Icon } from "@iconify/react";
import { tracks } from "../config/content";
import ProfileBadge from "../components/ProfileBadge";
import { motion } from "motion/react"

export default function DashboardPage() {
    return (
        <DefaultLayout>
            <div className="mt-4">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <p className="text-lg font-light">
                    Welcome to your dashboard, <span className="font-bold">TestAccount!</span>
                </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.5 }}
                >
                    <CircleChartCard title="XP" color="success" total={1358} chartData={[{name: "Total XP", value: 780, fill: "hsl(var(--nextui-primary))"}]} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.5 }}
                >
                    <CircleChartCard title="Level" color="success" total={1358} chartData={[{name: "XP To Next Level", value: 1000, toNext: 300, fill: "hsl(var(--nextui-primary))"}]} />
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
                                    1000
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
                            <ProfileBadge name="Account Created!" description="This badge is awarded to anyone that creates an account on MediLearn." xp={300} />
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
                                            <TrackCard track={track} />
                                        </motion.div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="nurse" title="Nurse">
                        <Card classNames={{ base: "bg-zinc-200 dark:bg-zinc-800 w-full" }}>
                            <CardBody className="w-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-4">
                                    {tracks.nurseTrack.map((track) => (
                                        <TrackCard key={track.id} track={track} />
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
