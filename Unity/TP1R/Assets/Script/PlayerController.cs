using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public Rigidbody rb;
    public int speed = 10;
    private int count;

    // Start is called before the first frame update
    void Start()
    {
        count = 0;
        rb = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        //fleche gauche et droite = (-1, 1)
        //fleche haut et bas = (-1, 1)
        float mouveHorizontal = Input.GetAxis("Horizontal");
        float mouveVertical = Input.GetAxis("Vertical");

        Vector3 mouvement = new Vector3(mouveHorizontal, 0, mouveVertical);
        rb.AddForce(mouvement * speed * Time.deltaTime);
    }
    void OnTriggerEnter(Collider other)
    {
        if(other.gameObject.tag == "cube")
        {
            other.gameObject.SetActive(false);
            count = count + 1;
        }
    }
}
