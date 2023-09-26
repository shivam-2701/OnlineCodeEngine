import express, { Response, Request } from "express";
import { randomBytes } from "crypto";
import { sendMessage } from "../config/rabbitmq.js";
import { SubmissionModel } from "../models/submission.js";

import {
  errorResponse,
  successResponse,
  getFromRedis,
} from "../helper/utils.js";

const lang = ["cpp", "javac", "python"];

export const submitCode = async (req: Request, res: Response) => {
  try {
    let data = {
      src: req.body.src,
      input: req.body.stdin,
      lang: req.body.lang,
      // 'timeout':req.body.timeout,
      folder: randomBytes(10).toString("hex"),
    };
    // console.log("Submission Controller", data);
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

export const getResult = async (req: Request, res: Response) => {
  try {
    let key = req.params.id;

    let status = await getFromRedis(key);

    if (status == null) {
      return res.json({ status: "Queued" });
    } else if (status == "Processing") {
      return res.json({ status: "Processing" });
    } else {
      const responseObject
        : {
          output: string,
          stderr: string,
          status: string,
          submission_id:
          string, lang:
          string,
          src: string
        } = JSON.parse(status);
      console.log(status);
      console.log(responseObject);
      const submission = await SubmissionModel.create({
        input: "",
        error: responseObject.stderr,
        lang: responseObject.lang,
        output: responseObject.output,
        src: responseObject.src,
        user: req.user
      });

      console.log(submission);

      return res.json(successResponse(status!));
    }
  } catch (error) {
    console.log(error);
    return res.json(errorResponse(500, "System error")).end();
  }
};
