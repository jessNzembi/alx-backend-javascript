export default function guardrail(mathFunction){
  let queue = [];
  try {
    queue.push(mathFunction());
  } catch (error) {
    queue.push(String(error));
  } finally {
    queue.push('Guardrail was processed');
  }
  return queue;
}
