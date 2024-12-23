import { Card, CardBody } from "@nextui-org/react";
import ProgressBar from "./ProgressBar";

export default function TrackCard({ track }) {
    return (
        <Card className="h-full" radius="sm">
            <CardBody>
                <img src={track.image} alt={track.title} className="w-full h-40 object-cover" />
                <h2 className="text-xl font-bold mt-4">{track.title}</h2>
                <p>{track.description}</p>
                <ProgressBar progress={track.completion} />
            </CardBody>
        </Card>
    );
}