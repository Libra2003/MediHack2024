import DefaultLayout from '../layouts/default';
import { Card, Button } from "@nextui-org/react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import { CircleChartCard } from '../components/RadialChart';

export default function LearningTrack({ content, title, description, children }) {
    const navigate = useNavigate();

    const handleCardClick = (link) => {
        navigate(link);
    }

    const completedCount = content.filter(item => item.completed).length;
    const totalCount = content.length;

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
                                {item.completed && <Icon icon="ei:check" width={26} height={26} className='text-red-400' />}
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
                {content.every(item => item.completed) ? (
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
                                <Button size="small" color="danger" className="mt-2" auto onPress={() => navigate('/dashboard')}>Claim Reward</Button>
                            </div>
                        </Card>
                    </motion.div>
                ) : (
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
