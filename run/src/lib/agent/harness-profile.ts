/**
 * MedQ harness profile (deepagents HarnessProfile parity).
 *
 * The deepagents package resolves per-model "harness profiles" — model-spec
 * keyed calibration for prompt assembly and tool visibility. MedQ resolves
 * providers through its own config chain (resolveMedQAgentConfig), so the
 * profile here is registered under the spec strings MedQ commonly runs and
 * carries MedQ-specific prompt calibration. Orthogonal to model selection:
 * it shapes the harness, not the model.
 */
import { registerHarnessProfile } from 'deepagents';

const MEDQ_PROFILE_SUFFIX =
  'You are operating inside MedQ, a medical education platform. Prefer precise, ' +
  'clinically accurate language; flag uncertainty explicitly; and remind learners to ' +
  'verify against current clinical guidance when it matters.';

let registered = false;

/** Idempotent registration — safe to call on every runtime assembly. */
export function ensureMedQHarnessProfile(defaultModelSpec?: string): void {
  if (registered) return;
  registered = true;
  try {
    registerHarnessProfile('medq', {
      systemPromptSuffix: MEDQ_PROFILE_SUFFIX,
    });
    // Also key the profile on the resolved default model string when it looks
    // like a provider spec (e.g. "glm-4.6", "gpt-4o-mini") so deployments
    // where createDeepAgent receives a string model pick it up.
    if (defaultModelSpec && /^[a-z0-9][a-z0-9._-]*$/i.test(defaultModelSpec)) {
      registerHarnessProfile(defaultModelSpec, {
        systemPromptSuffix: MEDQ_PROFILE_SUFFIX,
      });
    }
  } catch {
    // Profile registry is best-effort calibration — never break agent startup.
  }
}
