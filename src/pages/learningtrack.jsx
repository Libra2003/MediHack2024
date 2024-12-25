import DefaultLayout from '../layouts/default';
import { Card, Button } from "@nextui-org/react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import { CircleChartCard } from '../components/RadialChart';
import { useState, useEffect } from 'react';
import ProfileBadge from "../components/ProfileBadge";
import axiosInstance from "../utils/axiosInstance";

export default function LearningTrack({ content, title, description, children }) {
    const navigate = useNavigate();
    const [rewardClaimed, setRewardClaimed] = useState(false);
    const [user, setUser] = useState({
        username: "",
        xp: 0,
        level: 1,
        coins: 0,
        badges: []
    });
    const [completedCount, setCompletedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        document.title = "How To Perform CPR - MediLearn";
        const accountToken = localStorage.getItem("accountToken");
        axiosInstance.post("/auth/checkuser/", {token: accountToken}).then((res) => {
            setUser(res.data.user);
            setRewardClaimed(res.data.user.rewardClaimed);
            setCompletedCount(res.data.user.courses[0].modules.filter(item => item.completed).length);
            setTotalCount(res.data.user.courses[0].modules.length);
        });
    }, []);

    const CheckForLevelUp = (xp) => {
        let level = 1;
        let xpForNextLevel = 100; // XP required for the next level
        let totalXPForNextLevel = 100; // Cumulative XP needed for the next level

        while (xp >= totalXPForNextLevel) {
            xp -= totalXPForNextLevel; // Subtract cumulative XP needed for the current level
            level++;
            xpForNextLevel += 100; // Increase the XP required for the next level
            totalXPForNextLevel = xpForNextLevel; // Update cumulative XP for the next level
        }

        return level
    }

    const claimReward = () => {
        setRewardClaimed(true);
        axiosInstance.put(`/user/claim/${user._id}`, {
            coins: user.coins + 300,
            xp: user.xp + 300,
            level: CheckForLevelUp(user.xp + 300),
            badges: [...user.badges, {
                name: "CPR",
                description: "You have learned how to perform CPR.",
                xp: 200,
                icon: "healthicons:cpr"
            }, {
                name: "Recovery Position",
                description: "You have learned how to place an unconscious patient in the recovery position.",
                xp: 100,
                icon: "tabler:emergency-bed"
            }]
        }).then((res) => {
            setUser(res.data);
        });
    };

    const handleCardClick = (link) => {
        navigate(link);
    };

    return (
        <DefaultLayout>
            <div className="mt-4 mb-8 text-center">
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-lg font-light">
                    {description}
                </p>
            </div>
            <div className="flex flex-col items-center">
                {content.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className="w-full hover:cursor-pointer"
                        onClick={() => handleCardClick(item.moduleLink)}
                    >
                        <Card className="w-full p-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-bold">{item.title}</h1>
                                <Icon icon="line-md:play-filled" width={26} height={26} />
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-light">{item.description}</p>
                                { user.courses?.[0]?.modules?.[index]?.completed ? <Icon icon="ei:check" width={26} height={26} className='text-red-400' /> : ""}
                            </div>
                        </Card>
                        {index < content.length - 1 && (
                            <div className="flex flex-col items-center">
                                <div className="w-1 h-6 bg-red-500"></div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-center mt-8 mb-2">
                {user.courses?.[0]?.modules?.every(item => item.completed) ? ( rewardClaimed ? (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className="w-6/12 flex items-center justify-center"
                    >
                        <Card className='p-4 w-full'>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold">Congratulations!</p>
                                <p className="text-lg font-light">These rewards have been added to your account:</p>
                                <div className="flex items-center justify-center mt-4">
                                    <ProfileBadge name="CPR" description="You have learned how to perform CPR." xp={200} icon="healthicons:cpr" />
                                    <ProfileBadge name="Recovery Position" description="You have learned how to place an unconscious patient in the recovery position." xp={100} icon="tabler:emergency-bed" />
                                    <ProfileBadge name="Coins" description="You have earned 300 coins." xp={300} icon="tabler:coin-filled" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className="w-6/12 flex items-center justify-center"
                    >
                        <Card className='p-4 w-full'>
                            <div className="flex flex-col items-center">
                                <Icon icon="bx:bxs-medal" width={64} height={64} />
                                <p className="text-lg font-bold">Congratulations!</p>
                                <p className="text-lg font-light">You have completed this learning track.</p>
                                <Button size="small" color="danger" className="mt-2" auto onPress={claimReward}>Claim Reward</Button>
                            </div>
                        </Card>
                    </motion.div>
                )) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className="lg:w-3/12 w-6/12 flex items-center justify-center"
                    >
                        <CircleChartCard
                            title="Completion reward"
                            color="danger"
                            total={totalCount}
                            midText={`${completedCount}/${totalCount} Completed`}
                            chartData={[{ value: completedCount, fill: "hsl(var(--nextui-primary))" }]}
                            className="w-full"
                        />
                    </motion.div>
                )}
            </div>
        </DefaultLayout>
    )
}
