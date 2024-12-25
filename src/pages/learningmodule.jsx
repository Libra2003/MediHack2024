import DefaultLayout from "../layouts/default";

export default function LearningModule({ title, description, children }) {
    return (
        <DefaultLayout>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-lg font-light">{description}</p>
            </div>
            <div>
                {children}
            </div>
        </DefaultLayout>
    )
}
