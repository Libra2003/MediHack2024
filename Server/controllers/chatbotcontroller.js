export const postChatbot = async (req, res, next) => {
    try{
        const { message } = req.body;
        const response = await fetch("https://localhost:7203/chatbot");
        res.status(200).json(response);
    }
    catch(err) {
        next(err);
    }
};