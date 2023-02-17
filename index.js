import "dotenv/config.js";
import { logger } from "./lib/logger.js";
import { NearContract } from "./lib/near.js";
import { ValidatePermit } from "./lib/api.js";

async function main() {
  const contract = await NearContract();
  let permitsGranted = [];
  let permitsRejected = [];

  try {
    const permitsToVerify = await contract.get_oracle_permits_to_verify();
    logger.info("Permits to verify:", { permits: permitsToVerify });

    if (permitsToVerify.length > 0) {
      for await (const permit of permitsToVerify) {
        const permitIsValid = await ValidatePermit(permit);

        if (permitIsValid) {
          permitsGranted.push(permit);
        } else {
          permitsRejected.push(permit);
        }
      }
      logger.info("Permits granted:", { permits: permitsGranted });
      logger.info("Permits rejected:", { permits: permitsRejected });

      if (permitsGranted.length > 0) {
        await contract.permits_granted({
          permits: permitsGranted,
        });
      }

      if (permitsRejected.length > 0) {
        await contract.permits_rejected({
          permits: permitsRejected,
        });
      }

      logger.info("Succesfully verified all permits.");
    } else {
      logger.info("There's no permits to verify.");
    }
  } catch (e) {
    logger.error("Error thrown while processing permits: ", {
      error: e.message,
    });
  }
}

main().then(() => {
  process.exit(0);
});
