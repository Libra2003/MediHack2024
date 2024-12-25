import LearningModule from "../../learningmodule"
import { Card } from "@nextui-org/react"
import { useEffect } from 'react';
import axiosInstance from "../../../utils/axiosInstance";

export default function RecoveryPosition() {
    useEffect(() => {
        document.title = "How To Perform CPR - MediLearn";
        const accountToken = localStorage.getItem("accountToken");
        axiosInstance.post("/auth/checkuser/", {token: accountToken}).then((res) => {
            axiosInstance.put(`/user/courses/${res.data.user._id}`,
                {
                    "courses": [{
                        "title": "How To Perform CPR",
                        "description": "Learn the basics of CPR and how to perform it in an emergency situation.",
                        "modules": [
                            {
                                "title": "CPR (Cardiopulmonary Resuscitation)",
                                "description": "Learn how to perform CPR to resuscitate unresponsive patients.",
                                "completed": true
                            },
                            {
                                "title": "Recovery Position",
                                "description": "Learn how to place an unconscious patient in the recovery position.",
                                "completed": res.data.user.courses[0].modules[1].completed
                            }
                        ]
                    }]
                }
            )
        });
    }, []);

    return(
        <LearningModule title="Recovery Position" description="Learn how to place an unconscious patient in the recovery position.">
            <div className="flex justify-center">
                <img src="/images/recoveryimage.jpg" alt="What is CPR infographic" className="mt-4 rounded shadow-lg mb-4"/>
            </div>
            <Card className="mt-8 mb-4 p-6">
                <div className="text-justify mb-4">
                    <h2 className="text-2xl font-semibold mb-4">What is the recovery position?</h2>
                    <p className="text-lg leading-relaxed">
                        The recovery position is a safe and effective way of looking after someone who is unconscious and breathing. It helps keep their airway clear and open. It is used for casualties who are unconscious but breathing, and who do not need CPR. The recovery position can help prevent the casualty from choking on their tongue or breathing in vomit. It also allows any fluid to drain from their mouth.
                    </p>
                </div>
                <div className="text-justify">
                    <h2 className="text-2xl font-semibold mb-4">How to place someone in the recovery position:</h2>
                    <div className="text-lg leading-relaxed">
                        <span className="font-bold">Positioning:</span> Kneel beside the casualty, extend one arm above their head, and cross the other arm over the chest.<br/>
                        <span className="font-bold">Legs:</span> Cross the far leg over the other at the ankle<br/>
                        <span className="font-bold">Rolling:</span> Roll the casualty towards you, placing one hand on the hip and the other on the shoulder.<br/>
                        <span className="font-bold">Adjust:</span> Tilt the head to open the airway and bend the top leg at a right angle.<br/>
                        <span className="font-bold">Monitoring:</span> Monitor the casualty's condition until help arrives. If they stop breathing, perform CPR.<br/>
                        <br/>
                        Note: Avoid the recovery position if neck or spinal injuries are suspected.
                    </div>
                </div>
            </Card>
        </LearningModule>
    )
}
