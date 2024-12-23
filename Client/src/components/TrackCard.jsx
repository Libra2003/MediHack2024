import { Card, CardBody } from "@nextui-org/react";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";

export default function TrackCard({ track }) {
    const navigate = useNavigate();

    const handleTrackClick = () => {
        console.log("Track clicked", track);
        navigate(track.link);
    }

    return (
        <Card className="h-full hover:cursor-pointer" radius="sm" onPress={handleTrackClick}>
            <CardBody onClick={handleTrackClick}>
                <img src={track.image} alt={track.title} className="w-full h-40 object-cover" onClick={handleTrackClick} />
                <h2 className="text-xl font-bold mt-4" onClick={handleTrackClick}>{track.title}</h2>
                <p onClick={handleTrackClick}>{track.description}</p>
                <ProgressBar progress={track.completion} />
            </CardBody>
        </Card>
    );
}