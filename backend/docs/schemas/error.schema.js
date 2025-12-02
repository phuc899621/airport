/**
 * @swagger
 * components:
 *   schemas:
 *     ApiError:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: type of error
 *           example: "Server error"
 *         detail:
 *           type: string
 *           description: detail of error
 *           example: "Thông tin cụ thể của lỗi"
 *     BaseError:
 *       type: object
 *       properties:
 *         success: 
 *           type: boolean
 *           example: false
 *         error:
 *           $ref: '#/components/schemas/ApiError'

 */
