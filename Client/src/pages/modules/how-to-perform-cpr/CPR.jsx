import LearningModule from "../../learningmodule"
import { Card } from "@nextui-org/react"

export default function CPR() {
    return (
        <LearningModule title="CPR (Cardiopulmonary Resuscitation)" description="Learn how to perform CPR to resuscitate unresponsive patients.">
            <div className="flex justify-center">
                <img src="/images/cprguide.png" alt="What is CPR infographic" className="mt-4 rounded shadow-lg mb-4"/>
            </div>
            <Card className="mt-8 mb-4 p-6">
                <div className="text-justify mb-4">
                    <h2 className="text-2xl font-semibold mb-4">What is CPR?</h2>
                    <p className="text-lg leading-relaxed">
                        Cardiopulmonary resuscitation (CPR) is a lifesaving technique useful in many emergencies, including a heart attack or near drowning, where someone's breathing or heartbeat has stopped. The American Heart Association recommends starting CPR with chest compressions for everyone, from untrained bystanders to medical personnel.
                    </p>
                </div>
                <div className="text-justify">
                    <h2 className="text-2xl font-semibold mb-4">How to Perform CPR?</h2>
                    <div className="text-lg leading-relaxed">
                        <span className="font-bold">Position:</span> Lay the casualty on their back on a firm surface. Kneel beside them.<br/>
                        <span className="font-bold">Compressions:</span><br/>
                        <ul className="list-disc list-inside ml-4">
                            <li>Place hands on the breastbone: one hand's middle finger in the notch, other hand's heel on top.</li>
                            <li>Straighten elbows, lock shoulders over chest, and press down 4-5 cm with body weight.</li>
                            <li>Perform 30 compressions at 80-100 per minute.</li>
                        </ul>
                        <span className="font-bold">Breaths:</span> Give two slow, full breaths after 30 compressions.<br/>
                        <span className="font-bold">Continue:</span> Alternate 30 compressions and 2 breaths. After 4 cycles, check for a pulse.
                    </div>
                </div>
            </Card>
        </LearningModule>
    )
}
