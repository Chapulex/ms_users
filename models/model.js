'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_reg: {type: String},
    user_name: {type: String},
    last_name: {type: String},
    user_mail: {type: String, unique: true, required: true},
    address: {street: String, number: String},
    phone: {type: String},
    identity: {type: Schema.ObjectId, ref: "identity_type", number: String},
    password: {type: String, required: true},
    enabled: {type: String},
    city: {type: Schema.ObjectId, ref: "city"},
    birthday: {type: Date},
    conn_status: {type: Schema.ObjectId, ref: "conn_status"},
    user_sex: {
        sex_descr: String,
        enum: ["Masculino", "Femenino", "other"]},
    prof_collab: [{
        type: String,
        profession: String,
        price_per_hour: Number,
        summary: String,
        linkedin_url: String,
        collaborator_photo: String,
        academic_training: [{
            academic_inst_name: String,
            ac_date_start: Date,
            ac_date_end: Date,
            speciality: String,
            academic_degree: {
                type: Schema.ObjectId,
                ref: "academic_degree"
            },
            study_city: {
                type: Schema.ObjectId,
                ref: "city"
            }
        },{timestamps: true}],
        laboral_experience: [{
            company_name: String,
            date_start: Date,
            date_end: Date,
            actually: String,
            job_activities: String,
            position_job: String,
            descr_job: String
        }, {timestamps: true}],
        knowledges: {
            type: Schema.ObjectId,
            ref: "knowledges"
        }
    },{timestamps: true}],
    prof_enterpreneur: [{
        business_name: String,
        business_countr: {
            type: Schema.ObjectId,
            ref: "city"
        },
        logo_photo: String,
        bus_tax_number: String,
        business_phone: String,
        business_slogan: String
    }, {timestamps: true}],
    prof_investor: {
        invest_summary: String,
        finan_proj: {
            nom_proj: String,
            proj_descr: String,
            amount_financed: Number,
            show_financed: String
        }
    }    
}, {
    timestamps: true
});

module.exports = model('User', UserSchema)