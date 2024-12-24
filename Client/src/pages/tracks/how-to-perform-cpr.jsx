import { image } from "@nextui-org/theme";
import LearningTrack from "../learningtrack";

export default function HowToPerformCPRPage() {
    return (
        <LearningTrack
            title={"How to Perform CPR"}
            description={"Learn how to perform CPR to resuscitate unresponsive patients."}
            content={[
                {
                    title: "CPR (Cardiopulmonary Resuscitation)",
                    description: "Learn how to perform CPR to resuscitate unresponsive patients.",
                    moduleLink: "/how-to-perform-cpr/CPR",
                    completed: false,
                },
                {
                    title: "Recovery Position",
                    description: "Learn how to place an unconscious patient in the recovery position.",
                    moduleLink: "/how-to-perform-cpr/RecoveryPosition",
                    completed: true,
                },
        ]}>
        </LearningTrack>
    );
}
