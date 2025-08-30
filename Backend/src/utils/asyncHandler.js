const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    }
}

export {asyncHandler};

// const asyncHandler = () => {}
// const asyncHandler = (fn) => () => {}
// const asyncHandler = (fn) => () => Promise.resolve(fn()).catch((err) => console.log(err));
// const asyncHandler = (fn) => async () => { try { await fn() } catch (err) { console.log(err) } }


// const asyncHandler = (fnc) => {
//     return async (req, res, next) => {
//         try {
//             await fnc(req, res, next);
//         } catch (error) {
//             res.status(err.code || 500).json({
//                 status: "error",
//                 message: err.message || "Internal Server Error"
//             })
//         }
//     }
// }