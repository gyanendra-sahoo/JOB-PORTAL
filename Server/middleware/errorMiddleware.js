const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        errorCode: err.errorCode || null,
        path: req.originalUrl,
        timestamp: new Date().toISOString()
    });
};

export default errorMiddleware;