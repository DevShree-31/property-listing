import { model, Schema, Types } from "mongoose";

export interface Recommendation {
    from:Types.ObjectId,
    propertyId:Types.ObjectId,
    recommendatedAt:Date,
    message?:string
}



export const RecommendationSchema = new Schema<Recommendation>({
    from:{type:Schema.Types.ObjectId,ref:'User',required:true},
    propertyId:{type:Schema.Types.ObjectId,ref:'Property',required:true},
    recommendatedAt:{type:Date,default:Date.now()},
    message:{type:String,trim:true,maxlength:500}
})

export const RecommendationModel=model<Recommendation>('Recommendation',RecommendationSchema)
