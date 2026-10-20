
export const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body ?? {};

    const errors = [];

    if (typeof name !== "string" || !name.trim()) {
        errors.push("Name is required");
    }

    if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
        errors.push("A valid email is required");
    }

    if (
        typeof password !== "string" ||
        password.length < 8 ||
        password.length > 72
    ) {
        errors.push(
            "Password must be between 8 and 72 characters"
        );
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Validation failed",
            errors
        });
    }

    // Normalize email for consistent lookup
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();

    next();
};
