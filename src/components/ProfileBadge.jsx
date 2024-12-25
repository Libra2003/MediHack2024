import { Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function ProfileBadge({ name, description, xp, icon }) {
    return (
        <Tooltip
            content={
                <div className="px-1 py-2">
                    <div className="text-small font-bold">{name}</div>
                    <div className="text-tiny">{description}</div>
                    <div className="text-tiny text-green-400">XP: {xp}</div>
                </div>
            }
        >
            <div className="flex flex-col items-center">
                <Icon icon={icon} width={48} height={48} />
            </div>
        </Tooltip>
    );
}
