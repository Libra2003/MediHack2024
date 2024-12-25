export default function ProgressBar({ progress }) {
    return (
        <div className="relative pt-1 mt-2">
            <div className="flex mb-2 items-center justify-between">
                <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-md text-zinc-800 bg-zinc-200">
                        {progress}%
                    </span>
                </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-zinc-800">
                <div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-zinc-200"
                ></div>
            </div>
        </div>
    );
}
