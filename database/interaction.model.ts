import { model, models, Schema, Types } from "mongoose";

export interface IInteraction {
    user:Types.ObjectId;
    action:string;
    actionid:Types.ObjectId;
    actiontype:"question"|"answer";
}

const InteractionSchema = new Schema<IInteraction>({
    user:{type:Schema.Types.ObjectId,ref:"User",required:true},
    action:{type:String,required:true},
    actionid:{type:Schema.Types.ObjectId,required:true},
    actiontype:{type:String,enum:["question","answer"],required:true},

},{timestamps:true});

const Interaction = models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
