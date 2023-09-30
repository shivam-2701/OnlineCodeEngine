import express, { Response, Request } from "express";
import { randomBytes } from "crypto";
import { sendMessage } from "../config/rabbitmq.js";
import { SubmissionModel } from "../models/submission.js";

import {
  errorResponse,
  successResponse,
  getFromRedis,
  deleteFromRedis,
} from "../helper/utils.js";

const lang = ["cpp", "java", "python"];

// Controller for submitting the code

export const submitCode = async (req: Request, res: Response) => {
  try {
    let data = {
      src: req.body.src,
      input: req.body.stdin,
      lang: req.body.lang,
      folder: randomBytes(10).toString("hex"),
    };
    if (!lang.includes(data.lang)) {
      res
        .status(400)
        .json({
          msg: "Choose the correct language from set",
        })
        .end();
    }
    await sendMessage(data);
    return res
      .json({
        msg: "code submitted",
        submissionId: data.folder,
      })
      .end();
  } catch (error) {
    console.log("Error in submit endpoint contoller", error);
  }
};

// Controller for fetching submission result

export const getResult = async (req: Request, res: Response) => {
  try {
    let key = req.params.id;

    const existingSubmission = await SubmissionModel.findOne({
      submissionId: key,
    });
    if (existingSubmission) {
      console.log(existingSubmission);
      return res.json(
        successResponse({
          src: existingSubmission.src,
          lang: existingSubmission.lang,
          output: existingSubmission.output,
          stderr: existingSubmission.error,
          submission_id: existingSubmission.submissionId,
          input: existingSubmission.input,
        })
      );
    }
    let status = await getFromRedis(key);
    if (status == null) {
      return res.json({ status: "Queued" });
    } else if (status == "Processing") {
      return res.json({ status: "Processing" });
    } else {
      const responseObject: {
        output: string;
        stderr: string;
        status: string;
        submission_id: string;
        lang: string;
        src: string;
      } = JSON.parse(status);
      await deleteFromRedis(key);

      if (req.body.submission === true) {
        const submission = await SubmissionModel.create({
          input: "",
          error: responseObject.stderr,
          lang: responseObject.lang,
          output: responseObject.output,
          src: responseObject.src,
          user: req.user,
          submissionId: key,
        });
        console.log(submission);
      }
      return res.json(
        successResponse({
          src: responseObject.src,
          lang: responseObject.lang,
          output: responseObject.output,
          stderr: responseObject.stderr,
          submission_id: key,
        })
      );
    }
  } catch (error) {
    console.log(error);
    return res.json(errorResponse(500, "System error")).end();
  }
};
